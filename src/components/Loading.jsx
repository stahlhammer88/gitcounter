import React from 'react';
import ReactLoading from 'react-loading';
import {Fade} from 'react-reveal';

const Loading = () => {
    return (
        <Fade>
            <div className="counter__loading">
                <ReactLoading type='spin' color="#c5c5c5" height={50} width={50} />
            </div>
        </Fade>
    );
};

export default Loading;