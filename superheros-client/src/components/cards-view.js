import React, { useState, useEffect } from 'react';
import AvatarCard from './ui/avatar-card.js';
import NewHeroButton  from './ui/new-hero-button.js';
import SearchBar from './ui/search-bar';

function CardView({ house, changePage, selectPersonaje }){
    const [personajes, setPersonajes] = useState([]);
    const [personajesFiltered, setPersonajesFiltered] = useState([]);
    const [buscar, setBuscar] = useState(null);

    useEffect(async () => {
        try {
            findCharacters();
        } catch (err) {
            console.log(err);
        }
    },[]);
    
    const findCharacters = async () => {
        try {

            const response = await fetch(`http://localhost:8000/api/superheroes/getByCasa?casa=${house=="home" ? null : house}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if(data.exito){
                setPersonajes(data.personajes);
                setPersonajesFiltered(data.personajes);
            } else {
                return data.mensaje;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(buscar===null || buscar===''){
            setPersonajesFiltered(personajes);
        } else {
            setPersonajesFiltered(personajes.filter(personaje =>{
                return personaje.personaje.toLowerCase().includes(buscar.toLowerCase());
            }))
        }
    },[buscar])

    let logo;
    if(house !== "home"){
        logo = <img src={process.env.PUBLIC_URL + '/imgs/'+house+'-logo.png'}/>
    }
    
    return (
        <div className={"page "+house+"-background"}>
            {logo}
            <div className={house}>
                <SearchBar 
                    onChange={setBuscar} />
                    <NewHeroButton 
                        changePage={ changePage }
                        selectPersonaje={ selectPersonaje }
                        />
                    {personajesFiltered.map((item, index) => 
                        <AvatarCard 
                            changePage={ changePage }
                            selectPersonaje={ selectPersonaje }
                            personaje={item}
                            showHouse={house === "home"}
                            />
                    )}
            </div>
        </div>
    );
}

export default CardView;