// minimal-http-server/index.js
const http = require('http');

const server = {
  init: (port = 3000, hostname = 'localhost') => {
    const requestHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, world!');
    };

    const serverInstance = http.createServer(requestHandler);
    
    serverInstance.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
};

module.exports = server;
