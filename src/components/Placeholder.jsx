import React from 'react';
import { connect } from 'react-redux';

const Placeholder = props => {
    const {loading, lines} = props;    
    if (!loading && !lines) {
        return (
            <div className="counter__placeholder">Enter your repository name</div>
        );
    }    
    return null;
};

const mapStateToProps = state => {        
    return {        
        loading: state.loading,
        lines: state.lines
    }
}

export default connect(mapStateToProps)(Placeholder);