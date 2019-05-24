import React, { Component } from 'react';
import './main.scss';
import { connect } from 'react-redux';
import Row from './components/Row';
import {Fade} from 'react-reveal';
import Loading from './components/Loading';
import TableHeader from './components/TableHeader';
import Placeholder from './components/Placeholder';
import Panel from './components/Panel';

class App extends Component {
    state = {        
        lines: []        
    }   

    componentDidUpdate(prevProps) {        
        if (this.props !== prevProps) {
            const {lines, filteredLines} = this.props;            
            this.setState({lines: filteredLines? filteredLines : lines});
        }        
    }

    render() {
        const {lines} = this.state;
        return (
            <Fade>
                <div className="wrapper">
                    <h1><div className="logo"></div> GIT COUNTER</h1>
                    <Panel/>
                    <div className="counter">
                        <TableHeader/>
                        <Loading/>
                        <Placeholder/>
                        {lines && (lines.map(line => <Row key={line._id} {...line}/>))}
                    </div>
                </div>
            </Fade>
        );
    }
}

const mapStateToProps = state => {       
    return {
        lines: state.lines,
        filteredLines: state.filteredLines
    }
}

export default connect(mapStateToProps)(App);