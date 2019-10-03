import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from "./components/dropdown";
import names from "./components/names";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <div className="App-Component">
                <Dropdown names={names}/>
            </div>
        </div>
    );
}

export default App;
