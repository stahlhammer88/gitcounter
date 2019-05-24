import React, { Component } from 'react';
import Input from './ui/Input';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { getCountedLines } from './../actions/index';

class Panel extends Component {
    state = {
        urlError: false,
        urlErrorMessage: 'Please enter a valid repo url',
        value: ''
    }

    handleUserUrl = (e) => {
        const value = e.target.value;
        this.setState({value: value, urlError: false});
    }    

    getCountedLines = (e) => {              
        if (e.nativeEvent.type !== 'click' && e.keyCode !== 13) return;
        const {value} = this.state;

        if (!~value.indexOf('github.com')) {
            this.setState({urlError: true});
            return false;
        }        
        this.props
            .dispatch(getCountedLines(value))
            .then(_=> {                                
                this.setState({
                    lines: this.props.lines                    
                })
            })
            .catch(err => {
                console.error(err)
            });                
    }

    clearValue = () => {
        this.setState({value: ''})
    }

    render() {
        const {value, urlError, urlErrorMessage} = this.state;
        const {error, errorMessage} = this.props;
        return (
            <div className="input-container">  
                {(error || urlError) && (<Fade bottom><div className="input__error">{errorMessage || urlErrorMessage}</div></Fade>)}                      
                <Input 
                    handleKeyUp={this.getCountedLines} 
                    handleUserInput={this.handleUserUrl} 
                    value={value} 
                    placeholder="Enter your repository name"
                    isClearVisible={!!value}
                    clearHandler={this.clearValue}
                    id="input-url"/>  
                
                <div className="button" onClick={this.getCountedLines}>
                    COUNT!
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {     
    console.log(state);       
    return {                
        lines: state.lines,
        error: state.error,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(Panel);