import React, { Component } from 'react';
import './main.scss';
import { headerItems } from './data/headerItems';
import { getRepo } from './service';
import Row from './components/Row';

class App extends Component {
    state = {
        lines: []
    }

    renderHeaderItems = () => (
        headerItems.map((item, i) => (
            <div key={i} className="counter__row-item">{item}</div>
        ))
    )

    componentDidMount() {
        getRepo().then(lines => {
            this.setState({lines}); 
        });             
    }
    

    render() {
        const {lines} = this.state;
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
                    <Row lines={lines}/>
                </div>
            </div>
        );
    }
}

export default App;