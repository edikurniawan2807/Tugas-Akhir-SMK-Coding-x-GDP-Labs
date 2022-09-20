var http = require('http');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function(req, res) {

    if(req.url === "/login/" && req.method === "GET") {
        //show form login
        fs.readFile("login.html", (err, data) => {
            if(err) {
                //send response
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            //send form
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }

    if(req.url === "/login/" && req.method === "POST") {
        //take data
        var requestBody='';
        req.on('data', function(data) {
            //get data
            requestBody += data;
            //send response
            if(requestBody.length >1e7) {
                res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
                res.end('<!DOCTYPE html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html.');
            }
        });
        //we've got data
        //next step parsing data
        req.on('end', function() {
            var formData = qs.parse(requestBody);
            //check login data
            if(formData.username === "SMK" && formData.password === "coding") {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write("<h2>SELAMAT DATANG ADMIN!</h2>");
                res.write('<p> Username : '+formData.username+'</p>');
                res.write('<p> Password : '+formData.password+'</p>');
                res.write("<a href ='/login/'> Kembali ke halaman awal </a>");
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h2> Login Gagal! </h2>');
                res.write("<a href = '/login/'> Silahkan Coba Login Sekali Lagi </a>");
                res.end();
            }
        });
    }
}).listen(5000);
//show console
console.log('server is running on http://localhost:5000');