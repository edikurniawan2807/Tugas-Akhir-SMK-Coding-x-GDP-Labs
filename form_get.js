var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
    var q = url.parse(req.url, true);

    if(q.pathname == "/search/" && req.method === "GET") {
        //take the parameter from url
        var keyword = q.query.keyword;

        if(keyword) {
            //take data in form with GET method
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<h3>Search Results:</h3>");
            res.write("<p>Anda mencari: <b>" +keyword+ "</b></p>");
            res.write("<pre>Tidak Ada Hasil! Maaf website ini sedang dalam pemandangan</pre>");
            res.end("<a href = '/search'>Kembali ke halaman awal</a>");
        } else {
            //show form
            fs.readFile('search.html', (err, data) => {
                if(err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end("404 Not Found");
                }
                //send form
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }
    }
}).listen(8000);
//show console
console.log('server is running or http://localhost:8000');