const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
let jsonParser = bodyParser.json();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/access/index.html");
});

app.use("/access", express.static(__dirname + "/access"));

app.get('/api/tasks', function (req, res) {
    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    res.send(tasks);
})

app.get('/api/tasks/:id', function (req, res) {
    let taskId = req.params.id;
    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let task;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            task = tasks[i];
            break;
        }
    }
    if (task) {
        res.send(task)
    } else {
        res.status(404).send()
    }
});

app.post('/api/tasks', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let taskText = req.body.text;
    let task = { text: taskText, check: false };

    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let taskId = 0;
    for (let i = 0; i < tasks.length; i++) {
        taskId = taskId > tasks[i].id ? taskId : tasks[i].id;
    }

    task.id = isFinite(taskId) ? taskId + 1 : 0;

    tasks.push(task);

    fs.writeFileSync('db.json', JSON.stringify(tasks));
    res.send(task);
});

app.delete('/api/tasks/:id', function (req, res) {
    let taskId = req.params.id;
    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let index = -1;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        let task = tasks.splice(index, 1)[0];
        fs.writeFileSync('db.json', JSON.stringify(tasks));
        res.send(task);
    } else {
        res.status(404).send();
    }
});

app.put('/api/tasks', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let taskId = req.body.id;

    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let task;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            task = tasks[i];
            break;
        }
    }

    if (task) {
        task.check = task.check == true ? false : true;

        fs.writeFileSync('db.json', JSON.stringify(tasks));
        res.send(task);
    }
    else {
        res.status(404).send(user);
    }
});


app.listen(3000);