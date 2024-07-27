import bcrypt from 'bcryptjs';

const DATABASE_USER = 'users';
const DATABASE_JOBS = "job_applications";
const USERNAME = 'username';
const USER_ID = 'user_id';
const PASSWORD = 'password';

function base64urlEncode(str) {
	// return btoa(str)
	//   .replace(/=/g, '')
	//   .replace(/\+/g, '-')
	//   .replace(/\//g, '_');
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function base64urlDecode(str) {

	return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
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
async function createJWT(payload, secret) {

	const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
	const encodedPayload = base64urlEncode(JSON.stringify(payload));
	const signature = await createSignature(header, encodedPayload, secret);
	return `${header}.${encodedPayload}.${signature}`;
}

// Function to verify a JWT
async function verifyJWT(token, secret) {
	
	const [header, payload, signature] = token.split('.');
	const validSignature = await createSignature(header, payload, secret);
	if (signature !== validSignature) {
		throw new Error('Invalid token');
	}
	const decodedPayload = JSON.parse(base64urlDecode(payload));
	console.log("Decoded payload: " + decodedPayload);
	if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
		throw new Error('Token expired');
	}
	return decodedPayload;
}


//CORS settings
function handleOptions(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  return new Response(null, { headers });
}

function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}



export default {
  async fetch(request, env, ctx) {

    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }
    

    try {
      const db = env.DB;
      const JWT_SECRET = env.JWT_SECRET;

      const { method, url } = request;

      const parsedUrl = new URL(request.url);
      const pathname = parsedUrl.pathname;

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

		    const payload = { USERNAME: username, USER_ID: user.id, exp: Math.floor(Date.now() / 1000) + 3600};//1hour
        const token = await createJWT(payload, JWT_SECRET);

        return addCorsHeaders(new Response(JSON.stringify({ token }), {
          headers: { 'Content-Type': 'application/json' },
        }));
      } 
      else if (method === 'GET' && pathname === "/applications") {

        // Parse token
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
          return new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 });
        }
        const token = authHeader.split(' ')[1];


		    var payload = await verifyJWT(token, JWT_SECRET);

        // Parse param
        const user_id = payload.USER_ID;

        if (!user_id) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        // Fetch data from the database
        const data = await db.prepare('SELECT * FROM job_applications WHERE user_id = ?').bind(user_id).all();

        return addCorsHeaders(new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        }));
      } 
      else {
        return new Response('Not Found', { status: 404 });
      }
    } 
    catch (e) {
      return addCorsHeaders(new Response('Internal Error: ' + e, { status: 500 }));
    }
  }
};