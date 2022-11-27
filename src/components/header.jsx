import React from 'react';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <header>
            <p className="htitle">Список дел</p>
            <p className="logout">Выйти</p>
        </header>;
    }
}