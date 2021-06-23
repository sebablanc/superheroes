import React from 'react';
import CardsView from './cards-view';

function DCCharacters({ selectPersonaje, changePage }){
    return (
        <CardsView
            changePage={ changePage }
            selectPersonaje={ selectPersonaje }
            house="dc"
            />
    );
}

export default DCCharacters;