import React from 'react';

const SortButton = props => {
    const {index, name, sortKey, sortType, handleClick} = props;   
    
    return (
        <div            
            className={`counter__row-item ${sortKey === index ? `selected ${sortType}` : ''}`} 
            onClick={() => handleClick(index)}>
            <span>{name}</span>
        </div>
    );
};



export default SortButton;