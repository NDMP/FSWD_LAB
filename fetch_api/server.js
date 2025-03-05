const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port where the server will listen
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Parse the URL to determine which file to serve
    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';  // Serve index.html by default
    }

    // Determine the file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    // Set the appropriate content type based on file extension
    let contentType = 'text/html';  // Default is HTML
    if (extname === '.css') {
        contentType = 'text/css';
    }

    // Check if the requested file exists
    fs.exists(filePath, (exists) => {
        if (exists) {
            // Read and serve the file if it exists
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        } else {
            // File not found
            res.writeHead(404);
            res.end('File Not Found');
        }
    });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
