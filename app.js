require('dotenv').config();

const PORT = process.env.PORT

const express = require('express');

const app = express();

const cors = require('cors');

app.use(express.json());

app.use(cors('*'));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});

let todos = [ 
    { id: 1, task: 'Learn Node.js', completed: false},
    { id: 2, task: 'Build CRUD API', completed: false},
    { id: 3, task: 'Make video', completed: true}
];

app.get('/todos', (req,res) => {
    res.status(200).json(todos);
});

app.get('/todos/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id ===id);
    if (!todo) return res.status(404).json({message: 'Todo not found'});
    res.status(200).json(todo)
});

app.get('/todo/active', (req, res) => {
    const activeTodos = todos.filter((t) => t.completed === false);
    res.status(200).json(activeTodos);
});

app.post('/todos', (req,res) => {
    const {task} = req.body

    if (!task || task.length <= 2) {
        return res.status(400).json({message: 'Please provide the task'});
    }

    const newTodo = {id: todos.length + 1, ...req.body};
    todos.push(newTodo);
    res.status(201).json(newTodo);
   
});

app.patch('/todos/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id ===parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: 'Todo not found'});
    Object.assign(todo, req.body);
    res.status(200).json(todo);
});

app.delete('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
     todos = todos.filter((t) => t.id !== id); 
     if (todos.length === initialLength)
        return res.status(404).json({error: 'Not found'});
    res.status(204).send();
});



app.use((err, req, res, next) => {
    res.status(500).json({error: 'Server error!'});
});