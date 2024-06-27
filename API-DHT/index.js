const { createPool } = require('mysql');
const http = require('http');
const url = require('url'); // Modul untuk mem-parsing URL

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sensor_db",
    connectionLimit: 10
});

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(`Received request for ${req.url}`); // Logging URL yang diterima
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const reqUrl = url.parse(req.url, true); // Parse URL permintaan

    // Jika path adalah '/api/tanah'
    if (reqUrl.pathname === '/api/suhu') {
        pool.query('SELECT * FROM dht11', (err, result, fields) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error/xampp jangan lupa hidupin');
                console.error(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
        });
    } else {
        // Jika path tidak cocok dengan endpoint yang diinginkan
        console.log('Invalid endpoint accessed');
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 4000;

server.listen(PORT, () => {
    console.log('Server is running at http://localhost:${PORT}');
});

// suhu 4000
// tanah 3000
// server.listen(PORT, '0.0.0.0', () => {
//     console.log('Server is running at http://localhost:${PORT}');
// });