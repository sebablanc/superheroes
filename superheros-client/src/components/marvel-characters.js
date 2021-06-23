import React from 'react';
import CardsView from './cards-view';

function MarvelCharacters({ selectPersonaje, changePage }){
  
    return (
        <CardsView
            selectPersonaje={ selectPersonaje }
            changePage={ changePage }
            house="marvel"
            />
    );
}

export default MarvelCharacters;