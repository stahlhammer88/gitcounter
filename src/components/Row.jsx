import React from 'react';
import {Fade} from 'react-reveal';

const Row = ({fileName, overall, empty, code, comment}) => {        
    return (
        <Fade bottom>
            <div className="counter__row">
                <div className="counter__row-item counter__row-item--name">{fileName}</div>
                <div className="counter__row-item">{overall}</div>
                <div className="counter__row-item">{code}</div>
                <div className="counter__row-item">{comment}</div>
                <div className="counter__row-item">{empty}</div>
            </div>
        </Fade>
    );
};

export default Row;