const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

const tasks = [
    {
        id: 1,
        text: 'Clean bedroom',
        completed: false
    },
    {
        id: 2,
        text: 'Walk dog',
        completed: false
    }
];

let highestIndex = tasks.length;

app.get('/getalltasks', (req, res) => {
    res.send(tasks);
});


app.post('/addtask', (req, res, next) => {
    const taskText = req.body.text;
    if (!taskText) {
        next(new Error('No task given'));
    }
    else {
        highestIndex++;
        const newTask = {
            id: highestIndex,
            text: taskText,
            completed: false 
        };
        tasks.push(newTask);
        res.send(newTask);
    }
});

app.use('/addtask', (err, req, res, next) => {
    res.status(500);
    res.send('Could not add task.\n' + err);
});


app.put('/toggletask/:id', (req, res, next) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        next(new Error('Invalid task ID given'));
    }
    else {
        tasks[index].completed = true;
        res.send(tasks[index]);
    }
});

app.use('/toggletask/:id', (err, req, res, next) => {
    res.status(500);
    res.send('Could not complete task.\n' + err);
});


app.delete('/deletetask/:id', (req, res, next) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        next(new Error('Invalid task ID given'));
    }
    else {
        const deletedTask = tasks[index];
        tasks.splice(index, 1);
        res.send(deletedTask);
    }
});

app.use('/deletetask/:id', (err, req, res, next) => {
    res.status(500);
    res.send('Could not delete task.\n' + err);
});



app.listen(3001, () => {
    console.log('Listening on port 3001...');
});

