import React, { useEffect } from 'react';
import {useState} from 'react';

function TextAreaForm({label, valor, extraClass, onChange}) {

    const [value, setValue] = useState(valor ? valor : '');
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        textAreaAdjust();
    }, [textAreaAdjust])

    function handleTextChange(text) {
      setValue(text);
      setIsActive(text !== '');
      onChange(text)
    }

    function textAreaAdjust() {
        let element = document.getElementById("textArea-"+label.toLowerCase());
        element.style.height = "1px";
        element.style.height = (25+element.scrollHeight)+"px";
      }

    return (
        <div className={"form-data float-label "+ extraClass}>
            <textarea id={"textArea-"+label.toLowerCase()} className="input" name={label.toLowerCase()} value={value} onChange={(e) => {textAreaAdjust(); handleTextChange(e.target.value)}}></textarea>
            <label className={ value || isActive ? "Active" : ""} htmlFor={label.toLowerCase()}>{label}: </label>
        </div>
    );
}

export default TextAreaForm;