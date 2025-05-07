import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = () => {
    if (!task) return;
    const newTodo = { task };
    axios.post('http://localhost:5000/todos', newTodo)
      .then(() => {
        setTodos([...todos, newTodo]);
        setTask('');
      });
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h2>Todo List</h2>
      <input value={task} onChange={e => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
