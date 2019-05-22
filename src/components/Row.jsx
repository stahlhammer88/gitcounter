import React from 'react';

const Row = ({lines}) => {
    const renderItems = () => (
        lines.map((item, i) => (
            <div key={i} className="counter__row-item">{item}</div>
        ))
    )

    return (
        <div className="counter__row">
            {renderItems()}
        </div>
    );
};

export default Row;