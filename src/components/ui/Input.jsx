import React from 'react';

const Input = ({value, handleUserInput, handleKeyUp, ...rest}) => {
    return (
        <input value={value} onKeyUp={handleKeyUp} onChange={handleUserInput} {...rest} type="text"/>
    );
};

export default Input;