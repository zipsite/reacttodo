import React from 'react';
import TaskList from './task-list.jsx';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []};
        this.setTasks = this.setTasks.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.createTask = this.createTask.bind(this);
        this.checkTask = this.checkTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.getTasks();
    }

    setTasks(tasks) {
        this.setState({tasks: tasks});
    }

    getTasks() {
        fetch("api/tasks", {
            method: "GET",
            headers: { "Accept": "application/json"},
        }).then((res)=>{
            return res.json();
        }).then(this.setTasks);
    }

    createTask(text) {
        fetch("api/tasks", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text
            })
        }).then(this.getTasks);
    }

    checkTask(taskId) {
        fetch("api/tasks", {
            method: "PUT",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                id: taskId,
            })
        }).then(this.getTasks);
    }

    deleteTask(id) {
        fetch("api/tasks/" + id, {
            method: "DELETE",
            headers: { "Accept": "application/json"},
        }).then(this.getTasks);
    }

    onCreate (e) {
        if(e.nativeEvent.path[1].className == "add") {
            this.createTask(e.currentTarget.children[0].innerHTML);
        }
    }

    render() {
        return <main>
            <div className="input-task elem-list" onClick={this.onCreate}>
                <p className="elem-text" contentEditable="true" >Напишите</p>
                <div className="add">
                    <img src="/access/icon/icon-add.png" alt="" className="icon"></img>
                </div>
            </div>
            <TaskList 
                key="nocheck"
                check={false}
                tasks={this.state.tasks}
                context={this}    
            />
            <p className="text divide">Выполненные</p>
            <TaskList key="check" check={true} tasks={this.state.tasks} context={this}/>
        </main>;
    }
}