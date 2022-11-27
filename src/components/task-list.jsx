import React from "react";
import TaskElem from './task-elem.jsx';
export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let check = this.props.check;
        let tasks = this.props.tasks;
        return <>
            {tasks.map(item => (
                check == item.check
                ? <TaskElem key={item.id} id={item.id} text={item.text} check={item.check} context={this.props.context} />
                : <></>
        ))}
        </>;
    }
}