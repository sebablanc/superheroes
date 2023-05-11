import React, { useEffect, useState } from 'react';
import InputForm from './ui/input-form';
import SelectForm from './ui/select-form';
import TextAreaForm from './ui/textarea-form';
import CarouselCharacters from './ui/carousel';
import Botonera from './ui/botonera';
import messages from './ui/alert-messages';

function NewHero({personajeSelected, changePage }){

    const [personaje, setPersonaje] = useState(personajeSelected ? personajeSelected.personaje : '');
    const [nombrePersonaje, setNombrePersonaje] = useState(personajeSelected ? personajeSelected.nombrePersonaje :'');
    const [casa, setCasa] = useState(personajeSelected ? personajeSelected.casa : '');
    const [equipamiento, setEquipamiento] = useState(personajeSelected ? personajeSelected.equipamiento :'');
    const [year, setYear] = useState(personajeSelected ? personajeSelected.year : 0);
    const [numeroImagenes, setNumeroImagenes] = useState(personajeSelected ? personajeSelected.imagenes.length : 0);
    const [biografia, setBiografia] = useState(personajeSelected ? personajeSelected.biografia : '');
    const [listImages, setListImages] = useState(personajeSelected ? personajeSelected.imagenes : []);

    const houses = [{value:'dc', houseName: 'DC'}, {value:'marvel', houseName: 'Marvel'}]

    async function submitData() {
        if(personaje === '' || nombrePersonaje==='' || casa===''
            || year <= 0) return;

        try {
            let dataToSend = {
                id: personajeSelected && personajeSelected._id ? personajeSelected._id : null,
                personaje: personaje,
                nombrePersonaje: nombrePersonaje,
                casa: casa,
                equipamiento: equipamiento,
                year: year,
                imagenes: listImages,
                biografia: biografia
            };

            let url = '';
            let method = '';
            if(personajeSelected && personajeSelected._id){
                url = 'http://localhost:8000/api/superheroes/update';
                method = 'put';
            } else {
                url = 'http://localhost:8000/api/superheroes/create';
                method = 'post';
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();
            const icon = data.exito ? 'success' : 'error'
            messages.executeMessage(data.mensaje, icon);
        } catch (err) {
            console.log(err);
            messages.executeMessage("Error al intentar enviar la información.", 'warning');
        }
    }

    async function deleteData(){
        if(personaje === '') {
            messages.executeMessage('Debe seleccionar un personaje', 'warning');
            return;
        }

        try {
            let dataToSend = {
                personaje: personaje
            };

            let url = 'http://localhost:8000/api/superheroes/delete';
            let method = 'delete';
            
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();
            const icon = data.exito ? 'success' : 'error';
            messages.executeMessage(data.mensaje, icon);
            changePage('HOME');
        } catch (error) {
            console.log(error);
            messages.executeMessage("Error al intentar enviar la información.", 'warning');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData();
    }

    function handlePersonajeChange(event){
        if(event) {
            setPersonaje(event)
        } else {
            setPersonaje('')
        }
        handleNumeroImagesChange(numeroImagenes)
    }

    function handleNumeroImagesChange(event) {
        setListImages([]);
        if(event != null && event != '' && event > 0 && personaje != null && personaje != '' && personaje.length > 1){
            let li = [];
            for (let index = 0; index < parseInt(event); index++) {
                let imageName = personaje.toLowerCase() + (index > 0 ? '_'+index : '') + '.png';
                li.push(imageName);
            }
            console.log(li);
            setListImages(li);
        } else if(personaje != null && personaje != '' && personaje.length > 1 && event > 0){
            let li = [];
            let imageName = personaje + '.png';
            li.push(imageName);
            setListImages(li);
        } else if(event <= 0){
            setListImages([]);
        }
    }

    function HandleCancel(event){
        event.preventDefault();
        changePage('HOME');
    }

    async function HandleDelete(event){
        event.preventDefault();
        console.log('llega al handleDelte');
        let confirmed = await messages.confirmMessage('¿Seguro?');
        if(confirmed){
            deleteData();
        }
    }

    useEffect(async (event) => {
        try {
            handleNumeroImagesChange(numeroImagenes);
        } catch (err) {
            handleNumeroImagesChange(0);
        }
    },[numeroImagenes]);

    return (
        <div className="page home-background">
            <form id="addForm" className="agregar-superhero-form" onSubmit={(e)=> handleSubmit(e)}>
                <img className="marvel-hero-form" />
                <img className="dc-hero-form" />
                <div
                    className="new-hero-title full-grid">
                    {personaje!= null && personaje.length > 0 ? personaje : "¿A quién tenemos aquí?"}
                </div>
                
                <div className="full-grid flex-form-data">
                    <CarouselCharacters
                        list={listImages}/>
                    <div className="form-grid-data">
                        <InputForm 
                            extraClass="full-grid"
                            valor={personaje}
                            label="Personaje"
                            type="text"
                            disabled={personajeSelected && personajeSelected.personaje != null}
                            onChange={(event) => handlePersonajeChange(event)}/>
                        
                        <InputForm
                            extraClass="full-grid"
                            label="Nombre del Personaje"
                            type="text"
                            valor={nombrePersonaje}
                            onChange={(event) => setNombrePersonaje(event)}/>
                        
                        <SelectForm
                            label="Casa"
                            list={houses}
                            valueName="value"
                            showDataName="houseName"
                            valor={casa}
                            onChange={(event) => setCasa(event)} />
                        <img 
                            className="form-house-logo"
                            src={casa != '' && casa != null ?
                                process.env.PUBLIC_URL + '/imgs/' +
                                (casa==='marvel' ?  'marvel-logo.svg' : 'dc-logo.png')
                                : ''} />
                        
                        <InputForm
                            label="Equipamiento"
                            type="text"
                            valor={equipamiento}
                            onChange={(event) => setEquipamiento(event)}/>
                        <img className="form-equipamiento" src={personaje != '' && personaje != null
                                    && equipamiento != '' && equipamiento != null ?
                                    process.env.PUBLIC_URL + '/imgs/equipamiento/' + equipamiento.toLowerCase() 
                                    + '-' + personaje.toLowerCase() + '.png' : ''} />
                        
                        <InputForm
                            label="Año"
                            type="number"
                            valor={year}
                            onChange={(event) => setYear(event)}/>
                        
                        <InputForm
                            label="Cantidad de imágenes"
                            type="number"
                            valor={numeroImagenes}
                            onChange={(event) => setNumeroImagenes(event)}/>
                        
                        <TextAreaForm
                            extraClass="full-grid"
                            label="Biografía"
                            valor={biografia}
                            onChange={(event) => setBiografia(event)}/>
                        
                        <Botonera
                            onClickedSave={null}
                            onClickedDelete={(event) => HandleDelete(event)}
                            onClickedCancel={(event) => HandleCancel(event)}/>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default NewHero;