
const { createPool } = require('mysql');
const http = require('http');
const url = require('url'); 

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "soil_db",
    connectionLimit: 10
});

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(`Received request for ${req.url}`); // Logging URL yang diterima
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const reqUrl = url.parse(req.url, true); // Parse URL permintaan

    // Jika path adalah '/api/tanah'
    if (reqUrl.pathname === '/api/tanah') {
        pool.query(`SELECT * FROM kel_tanah`, (err, result, fields) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error/hidupin xamppppp');
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
        res.end('Not Found/folder belum dibuka');
    }
});

const PORT = 3000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// --------------

// const { createPool } = require('mysql');
// const http = require('http');

// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "dbkelembapan",
//     connectionLimit: 10
// });

// // Membuat server HTTP
// const server = http.createServer((req, res) => {
//     // Menggunakan pool untuk melakukan query ke database
//     pool.query(`SELECT * FROM t_kelembapan`, (err, result, fields) => {
//         if (err) {
//             res.writeHead(500, { 'Content-Type': 'text/plain' });
//             res.end('Internal Server Error');
//             console.error(err);
//         } else {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(result));
//         }
//     });
// });

// const PORT = 3000; // Port yang akan digunakan (misalnya 3000)

// // Menjalankan server pada port
// server.listen(PORT, 'localhost', () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });

// ----------------


// const { create } = require('domain');
// const {
//     createPool
// } = require('mysql');

// const pool = createPool({
//     host : "localhost",
//     user : "root",
//     password : "",
//     database : "dbkelembapan",
//     connectionLimit : 10
// })

// pool.query(`SELECT * FROM t_kelembapan`,(err, result , fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })