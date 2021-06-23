import React from 'react';
import newHero from '../../assets/add-hero.jpg';

function NewHeroButton({ selectPersonaje, changePage}){
    return (
        <div className="card new-hero-button">
            <img src={newHero} onClick={() =>{ selectPersonaje(null); changePage('NEW-HERO')}}/>
        </div>
    );
}

export default NewHeroButton;