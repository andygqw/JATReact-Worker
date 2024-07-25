import bcrypt from 'bcryptjs';

const DATABASE_USER = 'users';
const DATABASE_JOBS = "job_applications";
const USERNAME = 'username';
const USER_ID = 'user_id';
const PASSWORD = 'password';

function base64urlEncode(str) {
	return btoa(str)
	  .replace(/=/g, '')
	  .replace(/\+/g, '-')
	  .replace(/\//g, '_');
}

// Utility function to create a HMAC SHA-256 signature
async function createSignature(header, payload, secret) {
	const enc = new TextEncoder();
	const key = await crypto.subtle.importKey(
	  'raw',
	  enc.encode(secret),
	  { name: 'HMAC', hash: 'SHA-256' },
	  false,
	  ['sign']
	);
	const data = `${header}.${payload}`;
	const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
	return base64urlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

// Function to create a JWT
function createJWT(payload, secret) {
	const header = base64urlEncode({ alg: 'HS256', typ: 'JWT' });
	const encodedPayload = base64urlEncode(payload);
	const signature = createSignature(header, encodedPayload, secret);
	return `${header}.${encodedPayload}.${signature}`;
}

export default {
  async fetch(request, env, ctx) {
    try {
      const db = env.DB;
      const JWT_SECRET = env.JWT_SECRET;

      const { method, url } = request;

      const parsedUrl = new URL(request.url);
      const pathname = parsedUrl.pathname;

	  var jwt = require('jsonwebtoken');

      if (method === 'POST' && pathname === "/login") {

        // Parse the JSON body from the request
        const body = await request.json();

		const username = body.username;
        const password = body.password;

        if (!username || !password) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        // Authenticate the user
        const user = await db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
        }

		const payload = { USERNAME: username, USER_ID: user.id };
        const token = createJWT(payload, JWT_SECRET);

		console.log("Got token: " + token);

        return new Response(JSON.stringify({ token }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } 
      else if (method === 'GET' && pathname === "/applications") {
        // Parse token
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
          return new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 });
        }
        const token = authHeader.split(' ')[1];

        // Parse param
        const { user_id } = await request.json();

        if (!user_id) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          // Fetch data from the database
          const data = await db.prepare('SELECT * FROM ? WHERE ? = ?').bind(DATABASE_JOBS, USER_ID, decoded.user_id).all();

          return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
        }
      } 
      else {
        return new Response('Not Found', { status: 404 });
      }
    } 
    catch (e) {
      return new Response("Internal Error: " + e, { status: 500 });
    }
  }
};