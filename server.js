const express = require('express'); 
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

// Get all todos
app.get('/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file." });
    res.json(JSON.parse(data));
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file." });
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file." });
      res.status(201).json({ message: "Todo added successfully." });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
