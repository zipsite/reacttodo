import React from "react";
export default class TaskElem extends React.Component {
    constructor(props) {
        super(props)
        this.icon = {
            check: '/access/icon/icon-check.png',
            unCheck: '/access/icon/icon-uncheck.png',
            del: '/access/icon/icon-del.png'
        }
        this.onCheck = this.onCheck.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onCheck (e) {
        this.props.context.checkTask(Number(e.currentTarget.id));
    }

    onDelete(e) {
        this.props.context.deleteTask(Number(e.currentTarget.id));
    }

    render() {
        return (
            <div className="elem-list">
                <div className="checkbox" onClick={this.onCheck} id={this.props.id}>
                    <img src={this.props.check ? this.icon.check : this.icon.unCheck} alt="" className="icon"/>
                </div>
                <p className="elem-text">{this.props.text}</p>
                <div className="remove" onClick={this.onDelete} id={this.props.id}>
                    <img src="/access/icon/icon-del.png" alt="" className="icon"/>
                </div>
            </div>
        );
    }
}