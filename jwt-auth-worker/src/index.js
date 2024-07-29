import { parseHTML } from 'linkedom';
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

  return decodeURIComponent(atob(str).split('').map(function (c) {
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
function validString(str) {

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
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }));
        }

        // Authenticate the user
        const user = await db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
        }

        const payload = { USERNAME: username, USER_ID: user.id, exp: Math.floor(Date.now() / 1000) + 3600 };//1hour
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
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 }));
        }

        const token = authHeader.split(' ')[1];

        var payload = await verifyJWT(token, JWT_SECRET);

        // Parse param
        const user_id = payload.USER_ID;

        if (!user_id) {
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }));
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
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 }));
        }

        const token = authHeader.split(' ')[1];

        var payload = await verifyJWT(token, JWT_SECRET);

        // Parse param
        const user_id = payload.USER_ID;

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

        if (!user_id || !job_title || !company_name || !status || !Number.isInteger(is_marked)) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        const query = 'INSERT INTO job_applications (user_id, job_title, company_name, ' +
          'job_description, job_location, job_url, application_deadline_date, application_date, ' +
          'resume_version, status, notes, is_marked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const sql = 'SELECT last_insert_rowid() as id';

        const rows = await db.batch([
          db.prepare(query).bind(user_id, job_title, company_name, job_description,
            job_location, job_url, application_deadline_date, application_date, resume_version,
            status, notes, is_marked),
          db.prepare(sql),
        ]);

        return addCorsHeaders(new Response(JSON.stringify({ success: rows[0].success, id: rows[1].results[0].id }), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      //ENDPOINT: QUICK ADD
      else if (method === 'POST' && pathname === "/applications/quickadd") {

        const authHeader = request.headers.get('Authorization');

        if (!authHeader) {
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 }));
        }

        const token = authHeader.split(' ')[1];

        var payload = await verifyJWT(token, JWT_SECRET);

        // Parse param
        const user_id = payload.USER_ID;
        const body = await request.json();

        const url = validString(body.url);
        const date = validString(body.date);

        if (!user_id || !date || !url || !url.includes("linkedin.com")) {
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }));
        }

        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'
          }
        });

        //Get the config
        var query = 'SELECT quickAddResumeVersion FROM config WHERE user_id = ?';
        const config = await db.prepare(query).bind(user_id).first();

        if (response.status === 429) {

          return addCorsHeaders(new Response(JSON.stringify({ error: 'Too many requests to ' + url }), { status: 429 }));
        }
        else if (!response.ok) {

          return addCorsHeaders(new Response(JSON.stringify({ error: 'Request failed on ' + url }), { status: 400 }));
        }

        const text = await response.text();
        const { document } = parseHTML(text);

        const titleClass = "top-card-layout__title font-sans text-lg papabear:text-xl font-bold leading-open text-color-text mb-0 topcard__title";
        const companyNameClass = "topcard__org-name-link topcard__flavor--black-link";
        const companyLocClass = "topcard__flavor topcard__flavor--bullet";

        // Extract title
        let title = "";
        const titleTag = document.querySelectorAll(`h1`);
        titleTag.forEach(tag => {
          if (tag.className.includes(titleClass)) {
            title = tag.textContent;
          }
        });

        // Extract company name
        let companyName = "";
        const companyNameTags = document.querySelectorAll(`a`);
        companyNameTags.forEach(tag => {
          if (tag.className.includes(companyNameClass)) {
            companyName = tag.textContent.trim();
          }
        });

        // Extract location
        let location = "";
        const locationTags = document.querySelectorAll(`span`);
        locationTags.forEach(tag => {
          if (tag.className.includes(companyLocClass)) {
            location = tag.textContent.trim();
          }
        });

        const job_title = validString(title);
        const company_name = validString(companyName);
        const job_location = validString(location);
        const job_url = validString(url);
        const application_date = validString(date);
        const resume_version = validString(config.quickAddResumeVersion);
        const status = "Applied";
        const is_marked = 0;

        query = 'INSERT INTO job_applications (user_id, job_title, company_name, ' +
          'job_location, job_url, application_date, resume_version, status, is_marked)' +
          ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const sql = 'SELECT last_insert_rowid() as id';

        const rows = await db.batch([
          db.prepare(query).bind(user_id, job_title, company_name,
            job_location, job_url, application_date, resume_version, status, is_marked),
          db.prepare(sql),
        ]);

        const application = {
          id: rows[1].results[0].id,
          user_id: user_id,
          job_title: job_title,
          company_name: company_name,
          job_location: job_location,
          job_url: job_url,
          application_date: application_date,
          resume_version: resume_version,
          status: status,
          is_marked: is_marked
        };

        return addCorsHeaders(new Response(JSON.stringify({ success: rows[0].success, application: application }), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      //ENDPOINT: EDIT APPLICATION
      else if (method === 'POST' && pathname === "/applications/edit") {

        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 }));
        }

        const token = authHeader.split(' ')[1];

        var payload = await verifyJWT(token, JWT_SECRET);

        // Parse param
        const user_id = payload.USER_ID;

        if (!user_id) {
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }));
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

        if (!Number.isInteger(body.id) || job_title === null ||
          company_name === null || status === null || !Number.isInteger(is_marked)) {

          return addCorsHeaders(new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }));
        }

        const query = 'UPDATE job_applications SET job_title = ?, company_name = ?,' +
          'job_description = ?, job_location = ?, job_url = ?, application_deadline_date = ?,' +
          'application_date = ?, resume_version = ?, status = ?, notes = ?, is_marked = ?' +
          'WHERE id = ? and user_id = ?';

        const info = await db.prepare(query).bind(job_title, company_name, job_description,
          job_location, job_url, application_deadline_date, application_date, resume_version,
          status, notes, is_marked, body.id, user_id).run();

        return addCorsHeaders(new Response(JSON.stringify({ success: info.success }), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      //ENDPOINT: DELETE APPLICATION
      else if (method === 'POST' && pathname === "/applications/delete") {

        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Authorization header missing' }), { status: 401 }));
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
          return addCorsHeaders(new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 }));
        }

        var count = 0;
        for (let id of ids) {

          const query = 'DELETE FROM job_applications WHERE id = ? and user_id = ?';
          const info = await db.prepare(query).bind(id, user_id).run();
          if (info.success) count++;
        }

        return addCorsHeaders(new Response(JSON.stringify({ success: count }), {
          headers: { 'Content-Type': 'application/json' },
        }));
      }
      //ENDPOINT: REGISTER
      else if (method === 'POST' && pathname === "/register") {

        const body = await request.json();

        const username = body.username;
        const password = body.password;
        const create_time = body.create_time;

        if (!username || !password || !create_time) {
          return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }

        const getUser = 'SELECT * FROM users WHERE username = ?';

        const user = await db.prepare(getUser).bind(username).first();

        if (user) {

          return addCorsHeaders(new Response(JSON.stringify({ error: 'Username already exists' }), { status: 400 }));
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const sql = 'SELECT last_insert_rowid() as id';
        const sql2 =
          'INSERT INTO config (user_id, create_time, quickAddResumeVersion)' +
          ' VALUES (?, ?, ?)';

        const rows = await db.batch([
          db.prepare(query).bind(username, hashedPassword),
          db.prepare(sql),
        ]);

        if (rows[0].success === true){

          const info = await db.prepare(sql2).bind(rows[1].results[0].id, create_time, '').run();

          return addCorsHeaders(new Response(JSON.stringify({ success: info.success }), {
            headers: { 'Content-Type': 'application/json' },
          }));
        }
        else {

          return addCorsHeaders(new Response(JSON.stringify({ error: 'Registration failed' }), { status: 400 }));
        }
      }

      //ENDPOINT: FALL THROUGH DEFAULT NOT FOUND
      else {
        return addCorsHeaders(new Response('Not Found', { status: 404 }));
      }
    }
    catch (e) {
      return addCorsHeaders(new Response('Internal Error: ' + e, { status: 500 }));
    }
  }
};