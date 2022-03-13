import React from 'react';

const ModalTextInput = ({ type, text, name, value, func }) => {
    return (
        <div className='modal-text-input'>
            <input type={type} name={name} value={value} onChange={func} required />
            <label htmlFor={name}>{text}</label>
        </div>
    );
}

export default ModalTextInput;