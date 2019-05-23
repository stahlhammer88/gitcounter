import React, { Component } from 'react';
import './main.scss';
import { connect } from 'react-redux';
import { headerItems } from './data/headerItems';
import getRepo from './actions';
import Row from './components/Row';
import {Fade} from 'react-reveal';
import Loading from './components/Loading';
import SortButton from './components/SortButton';
import _ from 'lodash';
import Input from './components/ui/Input';

class App extends Component {
    state = {
        loading: false,
        lines: [],
        userUrl: '',
        filterValue: '',
        sortType: 'asc',
        sortKey: 'overall',
        urlError: false
    }

    renderHeaderItems = () => (
        headerItems.map((item, i) => {
            const {sortType, sortKey} = this.state;
            return (
                <SortButton 
                    key={item._id} 
                    {...item} 
                    clickHandler={this.sortLines}
                    sortType={sortType}
                    sortKey={sortKey}/>
            )
        })
    )    
    
    handleUserUrl = (e) => {
        const value = e.target.value;
        this.setState({userUrl: value, urlError: false});
    }

    handleUserFilter = (e) => {
        const value = e.target.value.toLowerCase();
        const {lines} = this.props;
        const newLines = [...lines];

        const filteredLines = newLines.filter(t => !!~t.fileName.toLowerCase().indexOf(value));        
        this.setState({filterValue: value, lines: filteredLines});
    }

    getCountedLines = (e) => {              
        if (e.nativeEvent.type !== 'click' && e.keyCode !== 13) return;
        const {userUrl} = this.state;

        if (!~userUrl.indexOf('github.com')) {
            this.setState({urlError: true});
            return false;
        }
        this.setState({loading: true});
        this.props.dispatch(getRepo(userUrl))
            .then(() => {
                this.setState({
                    lines: this.props.lines,
                    loading: false
                })
            })
            .catch(err => {
                console.error(err)
            });                
    }

    sortLines = (index) => {
        const {lines, sortType} = this.state;
        const newLines = [...lines];
        const sortedLines = _.orderBy(newLines, [index], [sortType]);
        const newSortType = sortType === 'asc' ? 'desc' : 'asc';
        this.setState({
            lines: sortedLines, 
            sortType: newSortType,
            sortKey: index
        });
    }    

    render() {
        const {loading, lines, userUrl, filterValue, urlError} = this.state;        
        return (
            <Fade>
                <div className="wrapper">
                    <h1><div className="logo"></div> GIT COUNTER</h1>
                    <div className="input">  
                        {urlError && (<Fade bottom><div className="counter__error">Please enter a valid repo url</div></Fade>)}                      
                        <Input 
                            handleKeyUp={this.getCountedLines} 
                            handleUserInput={this.handleUserUrl} 
                            value={userUrl} 
                            placeholder="Enter your repository name"/>  

                        <div className="button" onClick={this.getCountedLines}>
                            COUNT!
                        </div>
                    </div>
                    <div className="counter">
                        <div className="counter__row counter__row--header">
                            {this.renderHeaderItems()}
                            <div className="counter__filter-container">
                                <Input 
                                    handleUserInput={this.handleUserFilter} 
                                    value={filterValue}
                                    placeholder="Filter by name"/>
                            </div>
                        </div>

                        {loading && <Loading/>}

                        {(!loading && !lines.length) && (
                            <div className="counter__placeholder">Enter your repository name</div>
                        )}

                        {lines && (lines.map((line) => <Row key={line._id} {...line}/>))}                    
                    </div>
                </div>
            </Fade>
        );
    }
}

const mapStateToProps = state => {        
    return {
        lines: state.lines
    }
}

export default connect(mapStateToProps)(App);