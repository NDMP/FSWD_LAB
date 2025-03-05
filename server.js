const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Serve the form page
app.get('/', (req, res) => {
    res.render('home');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;
    
    // Read existing data from the JSON file
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        
        let jsonData = [];
        if (data) {
            jsonData = JSON.parse(data);
        }

        // Add the new form data to the JSON array
        jsonData.push(formData);

        // Save updated data back to the JSON file
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing to file');
            }

            // Redirect to the results page
            res.redirect('/result');
        });
    });
});

// Display stored data
app.get('/result', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        const jsonData = data ? JSON.parse(data) : [];
        res.render('result', { formData: jsonData });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Set up Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',  // This tells Express Handlebars to use the 'main' layout by default
}));
app.set('view engine', 'handlebars');
