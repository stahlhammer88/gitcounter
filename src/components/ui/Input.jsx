import React from 'react';

const Input = ({value = '', handleUserInput, clearHandler, isClearVisible, handleKeyUp, ...rest}) => {    
    return (
        <div className="input">
            <input value={value} onKeyUp={handleKeyUp} onChange={handleUserInput} {...rest} type="text"/>
            {isClearVisible && <div onClick={clearHandler} className="input__cancel"></div>}
        </div>        
    );
};

export default Input;