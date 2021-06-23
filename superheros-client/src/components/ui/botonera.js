import React from 'react';

function Botonera({onClickedSave, onClickedCancel, onClickedDelete}){
    return(
        <div className="botonera-container full-grid">
            <button className="btn btn-delete" onClick={onClickedDelete}>Eliminar</button>
            <button className="btn btn-cancel" onClick={onClickedCancel}>Cancelar</button>
            <button className="btn btn-save" type="submit">Guardar</button>
        </div>
    );
}

export default Botonera;