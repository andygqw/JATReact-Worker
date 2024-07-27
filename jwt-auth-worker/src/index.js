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

// async function parseUserIdFromHeader(authHeader){

//   const token = authHeader.split(' ')[1];

//   var payload = await verifyJWT(token, JWT_SECRET);

//   // Parse param
//   return payload.USER_ID;
// }

// Data Manipulation
function validString(str){

  if (str === null || str === undefined || str.trim() === "") {

    return null;
  }
  else {
    return str;
  }
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

      // ENDPOINT: LOG IN 
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
      //ENDPOINT: APPLICATIONS
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

        const query = 'SELECT * FROM job_applications WHERE user_id = ? ORDER BY application_date DESC, id DESC';

        // Fetch data from the database
        const data = await db.prepare(query).bind(user_id).all();

        return addCorsHeaders(new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        }));
      } 
      //ENDPOINT: ADD APPLICATION
      else if (method === 'POST' && pathname === "/applications/add") {

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

        const body = await request.json();

        const job_title = validString(body.job_title);
        const company_name = validString(body.company_name);
        const job_description = validString(body.job_description);
        const job_location = validString(body.job_location);
        const job_url = validString(body.job_url);
        const application_deadline_date = validString(body.application_deadline_date);
        const application_date = validString(body.application_date);
        const resume_version = validString(body.resume_version);
        const status = validString(body.status);
        const notes = validString(body.notes);
        const is_marked = body.is_marked ? 1 : 0;


        if (!user_id || !job_title || !company_name || !status || !is_marked) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        const query = 'INSERT INTO job_applications (user_id, job_title, company_name, ' +
        'job_description, job_location, job_url, application_deadline_date, application_date, ' +
        'resume_version, status, notes, is_marked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const info = await db.prepare(query).bind(user_id, job_title, company_name, job_description, 
        job_location, job_url, application_deadline_date, application_date, resume_version,
        status, notes, is_marked).run();

        return addCorsHeaders(new Response(JSON.stringify({ success: info.success }), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      //ENDPOINT: DELETE APPLICATION
      else if (method === 'POST' && pathname === "/applications/delete") {

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

        const body = await request.json();

        const ids = body.application_id;

        if (!ids) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        var count = 0;
        for (let id of ids) {

          const query = 'DELETE FROM job_applications WHERE id = ?';
          const info = await db.prepare(query).bind(id).run();
          if(info.success) count++;
        }

        return addCorsHeaders(new Response(JSON.stringify({ success: count}), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }

      //ENDPOINT: FALL THROUGH DEFAULT NOT FOUND
      else {
        return new Response('Not Found', { status: 404 });
      }
    } 
    catch (e) {
      return addCorsHeaders(new Response('Internal Error: ' + e, { status: 500 }));
    }
  }
};