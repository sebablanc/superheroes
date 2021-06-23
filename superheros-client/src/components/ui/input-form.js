import React from 'react';
import {useState} from 'react';

function InputForm({label, valor, type, disabled, extraClass, onChange}) {

    const [value, setValue] = useState(valor ? valor : '');
    const [isActive, setIsActive] = useState(false);

    function handleTextChange(text) {
        setValue(text);
        setIsActive(text !== '');
        onChange(text)
    }

    return (
        <div className={"form-data float-label "+ extraClass}>
            <input
                className="input" name={label.toLowerCase()}
                defaultValue={value}
                type={type}
                disabled={disabled}
                onBlur={(e) => {handleTextChange(e.target.value)}}/>
            <label className={ value || (type == "number" && value == 0) || isActive ? "Active" : ""} htmlFor={label.toLowerCase()}>{label}: </label>
        </div>
    );
}

export default InputForm;