import React from 'react';
import ReactLoading from 'react-loading';
import {Fade} from 'react-reveal';
import { connect } from 'react-redux';

const Loading = (props) => {
    const {loading} = props;

    if (!loading) return null;
    return (
        <Fade>
            <div className="counter__loading">
                <ReactLoading type='spin' color="#c5c5c5" height={50} width={50} />
            </div>
        </Fade>
    );
};

const mapStateToProps = state => {        
    return {        
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Loading);