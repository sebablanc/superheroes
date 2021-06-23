import React from 'react';
import { useState } from 'react';

function SelectForm({label, valor, list, valueName, showDataName, onChange}){
    const [value, setValue] = useState(valor ? valor : '');

    function handleTextChange(text) {
      setValue(text);
      onChange(text);
    }
    return(
        <div className="form-data float-label">
            <select className="selector input" name={label.toLowerCase()} onChange={(e) => handleTextChange(e.target.value)}>
                <option value="">-- Seleccioná la casa --</option>
                {list.map((item, index) => <option value={item[valueName]} selected={item[valueName] == valor}>{item[showDataName]}</option>)}
            </select>
            <label className="Active" htmlFor={label.toLowerCase()}>{label}: </label>
        </div>
    );
}

export default SelectForm;