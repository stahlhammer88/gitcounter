import React, { Component } from 'react';
import './main.scss';
import { headerItems } from './data/headerItems';
import { getRepo } from './service';

class App extends Component {
    renderHeaderItems = () => (
        headerItems.map((item, i) => (
            <div key={i} className="counter__row-item">{item}</div>
        ))
    )

    componentDidMount() {
        getRepo();
    }
    

    render() {
        return (
            <div className="wrapper">
                <h1>GIT COUNTER</h1>
                <div className="input">
                    <input type="text" placeholder="Enter your repository name"/>
                    <div className="button">
                        COUNT!
                    </div>
                </div>
                <div className="counter">
                    <div className="counter__row counter__row--header">
                        {this.renderHeaderItems()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;