const { createPool } = require('mysql');
const http = require('http');
const url = require('url');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbfeedback",
    connectionLimit: 10
});

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const reqUrl = url.parse(req.url, true);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Endpoint untuk mengambil semua feedback
    if (reqUrl.pathname === '/api/feedback' && req.method === 'GET') {
        pool.query('SELECT * FROM t_feedback', (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
        });
    }
    // Endpoint untuk menambahkan feedback baru
    else if (reqUrl.pathname === '/api/feedback' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { email, masukan } = JSON.parse(body);
            pool.query('INSERT INTO t_feedback (email, masukan) VALUES (?, ?)', [email, masukan], (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    console.error(err);
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Feedback saved successfully' }));
                }
            });
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
