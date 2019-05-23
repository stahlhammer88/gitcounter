import React from 'react';

const SortButton = ({_id, index, name, clickHandler, sortType, sortKey}) => {
    return (
        <div 
            key={_id} 
            className={`counter__row-item ${sortKey === index ? `selected ${sortType}` : ''}`} 
            onClick={() => clickHandler(index)}>

            <span>{name}</span>
        </div>
    );
};

export default SortButton;