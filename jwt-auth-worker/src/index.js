import { parseHTML } from 'linkedom';
import bcrypt from 'bcryptjs';


// Utility Functions
function base64urlEncode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
}

function base64urlDecode(str) {
  return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

async function createSignature(header, payload, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const data = `${header}.${payload}`;
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return base64urlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

async function createJWT(payload, secret) {
  const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  const signature = await createSignature(header, encodedPayload, secret);
  return `${header}.${encodedPayload}.${signature}`;
}

async function verifyJWT(token, secret) {
  const [header, payload, signature] = token.split('.');
  const validSignature = await createSignature(header, payload, secret);
  if (signature !== validSignature) throw new Error('Invalid token');
  const decodedPayload = JSON.parse(base64urlDecode(payload));
  if (decodedPayload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');
  return decodedPayload;
}

function validString(str) {
  str = String(str);
  return str && str.trim() !== "" ? str : null;
}

function handleOptions(request) {
  return new Response(null, { headers: corsHeaders() });
}

function addCorsHeaders(response) {
  Object.entries(corsHeaders()).forEach(([key, value]) => response.headers.set(key, value));
  return response;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

async function parseBody(request) {
  try {
    return await request.json();
  } catch (error) {
    throw new Error('Invalid JSON body');
  }
}

async function getUserFromDb(db, username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  return await db.prepare(query).bind(username).first();
}

async function insertJobApplication(db, applicationData) {

  const check = [0, 1, 2, 7, 9, 11];
  check.forEach((i) => {

    if (applicationData[i] === null) {

      throw new Error('Invalid request');
    }
  });
  const query = 'INSERT INTO job_applications (user_id, job_title, company_name, job_description, job_location, job_url, application_deadline_date, application_date, resume_version, status, notes, is_marked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const sql = 'SELECT last_insert_rowid() as id';
  const rows = await db.batch([
    db.prepare(query).bind(...applicationData),
    db.prepare(sql),
  ]);
  return rows[1].results[0].id;
}

async function handleLogin(request, db, JWT_SECRET) {
  const { username, password } = await parseBody(request);
  if (!username || !password) throw new Error('Invalid request');
  const user = await getUserFromDb(db, username);
  if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Invalid username or password');
  const payload = { USERNAME: username, USER_ID: user.id, exp: Math.floor(Date.now() / 1000) + 3600 };
  const token = await createJWT(payload, JWT_SECRET);
  return addCorsHeaders(new Response(JSON.stringify({ token }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleGetApplications(request, db, JWT_SECRET) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const query = 'SELECT * FROM job_applications WHERE user_id = ? ORDER BY application_date DESC, id DESC';
  const data = await db.prepare(query).bind(payload.USER_ID).all();
  return addCorsHeaders(new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }));
}

async function handlerUserDetails(request, db, JWT_SECRET) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const query = 'SELECT username FROM users WHERE id = ?';
  const query2 = 'SELECT quickAddResumeVersion FROM config WHERE user_id = ?';
  const rows = await db.batch([
    db.prepare(query).bind(payload.USER_ID),
    db.prepare(query2).bind(payload.USER_ID),
  ]);
  return addCorsHeaders(new Response(JSON.stringify({
    username: rows[0].results[0].username,
    quickAddResumeVersion: rows[1].results[0].quickAddResumeVersion
  }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleAddApplication(request, db, JWT_SECRET) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const user_id = payload.USER_ID;
  const body = await parseBody(request);
  const applicationData = [
    user_id,
    validString(body.job_title),
    validString(body.company_name),
    validString(body.job_description),
    validString(body.job_location),
    validString(body.job_url),
    validString(body.application_deadline_date),
    validString(body.application_date),
    validString(body.resume_version),
    validString(body.status),
    validString(body.notes),
    body.is_marked ? 1 : 0,
  ];
  const id = await insertJobApplication(db, applicationData);
  return addCorsHeaders(new Response(JSON.stringify({ success: true, id }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleQuickAdd(request, db, JWT_SECRET) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const user_id = payload.USER_ID;
  const body = await parseBody(request);
  const url = validString(body.url);
  const date = validString(body.date);
  if (!user_id || !date || !url || !url.includes("linkedin.com")) throw new Error('Invalid request');
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (response.status === 429) throw new Error('Requested site busy, try again!');
  if (!response.ok) throw new Error('Request failed');
  const text = await response.text();
  const { document } = parseHTML(text);
  const config = await db.prepare('SELECT quickAddResumeVersion FROM config WHERE user_id = ?').bind(user_id).first();
  const title = Array.from(document.querySelectorAll('h1')).find(tag => tag.className.includes('top-card-layout__title'))?.textContent || '';
  const company_name = Array.from(document.querySelectorAll('a')).find(tag => tag.className.includes('topcard__org-name-link'))?.textContent.trim() || '';
  const job_location = Array.from(document.querySelectorAll('span')).find(tag => tag.className.includes('topcard__flavor--bullet'))?.textContent.trim() || '';
  const applicationData = [
    user_id,
    validString(title),
    validString(company_name),
    null,
    validString(job_location),
    url,
    null,
    date,
    validString(config.quickAddResumeVersion),
    'Applied',
    null,
    0,
  ];
  const id = await insertJobApplication(db, applicationData);
  const application = { id, user_id, job_title: title, company_name, job_location, job_url: url, application_date: date, resume_version: config.quickAddResumeVersion, status: 'Applied', is_marked: 0 };
  return addCorsHeaders(new Response(JSON.stringify({ success: true, application }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleEditApplication(request, db, JWT_SECRET) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const user_id = payload.USER_ID;
  const body = await parseBody(request);
  const applicationData = [
    validString(body.job_title),
    validString(body.company_name),
    validString(body.job_description),
    validString(body.job_location),
    validString(body.job_url),
    validString(body.application_deadline_date),
    validString(body.application_date),
    validString(body.resume_version),
    validString(body.status),
    validString(body.notes),
    body.is_marked ? 1 : 0,
    body.id,
    user_id,
  ];
  if (!applicationData[0] || !applicationData[1] ||
    !applicationData[6] || !applicationData[8] ||
    !Number.isInteger(applicationData[10])) throw new Error('Invalid request');
  const query = 'UPDATE job_applications SET job_title = ?, company_name = ?, job_description = ?, job_location = ?, job_url = ?, application_deadline_date = ?, application_date = ?, resume_version = ?, status = ?, notes = ?, is_marked = ? WHERE id = ? and user_id = ?';
  const info = await db.prepare(query).bind(...applicationData).run();
  return addCorsHeaders(new Response(JSON.stringify({ success: info.success }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleDeleteApplication(request, db, JWT_SECRET) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const user_id = payload.USER_ID;
  const body = await parseBody(request);
  const ids = body.application_id;
  if (!ids || !Array.isArray(ids)) throw new Error('Invalid request');
  let count = 0;
  for (const id of ids) {
    const query = 'DELETE FROM job_applications WHERE id = ? and user_id = ?';
    const info = await db.prepare(query).bind(id, user_id).run();
    if (info.success) count++;
  }
  return addCorsHeaders(new Response(JSON.stringify({ success: count }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleUserUpdate(request, db, JWT_SECRET){

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) throw new Error('Authorization header missing');
  const token = authHeader.split(' ')[1];
  const payload = await verifyJWT(token, JWT_SECRET);
  const user_id = payload.USER_ID;
  const body = await parseBody(request);

  const quickAddResumeVersion = validString(body.quickAddResumeVersion);

  await db.prepare('UPDATE config SET quickAddResumeVersion = ? WHERE user_id = ?').bind(quickAddResumeVersion, user_id).run();

  return addCorsHeaders(new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } }));
}

async function handleRegister(request, db) {
  const body = await parseBody(request);
  const { username, password, create_time } = body;
  if (!username || !password || !create_time) throw new Error('Invalid request');
  const user = await getUserFromDb(db, username);
  if (user) throw new Error('Username already exists');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const getLastInsertIdQuery = 'SELECT last_insert_rowid() as id';
  const insertConfigQuery = 'INSERT INTO config (user_id, create_time, quickAddResumeVersion) VALUES (?, ?, ?)';
  const rows = await db.batch([db.prepare(insertUserQuery).bind(username, hashedPassword), db.prepare(getLastInsertIdQuery)]);
  if (!rows[0].success) throw new Error('Registration failed');
  await db.prepare(insertConfigQuery).bind(rows[1].results[0].id, create_time, '').run();
  return addCorsHeaders(new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } }));
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return handleOptions(request);
    try {
      const { DB: db, JWT_SECRET } = env;
      const { method } = request;
      const { pathname } = new URL(request.url);
      switch (true) {
        case method === 'POST' && pathname === '/login':
          return await handleLogin(request, db, JWT_SECRET);
        case method === 'GET' && pathname === '/applications':
          return await handleGetApplications(request, db, JWT_SECRET);
        case method === 'GET' && pathname === '/user/details':
          return await handlerUserDetails(request, db, JWT_SECRET);
        case method === 'POST' && pathname === '/applications/add':
          return await handleAddApplication(request, db, JWT_SECRET);
        case method === 'POST' && pathname === '/applications/quickadd':
          return await handleQuickAdd(request, db, JWT_SECRET);
        case method === 'POST' && pathname === '/applications/edit':
          return await handleEditApplication(request, db, JWT_SECRET);
        case method === 'POST' && pathname === '/applications/delete':
          return await handleDeleteApplication(request, db, JWT_SECRET);
        case method === 'POST' && pathname === '/user/update':
          return await handleUserUpdate(request, db, JWT_SECRET);
        case method === 'POST' && pathname === '/register':
          return await handleRegister(request, db);
        default:
          return addCorsHeaders(new Response('Not Found', { status: 404 }));
      }
    } catch (e) {
      return addCorsHeaders(new Response(JSON.stringify({ error: e.message }), { status: 500 }));
    }
  }
};