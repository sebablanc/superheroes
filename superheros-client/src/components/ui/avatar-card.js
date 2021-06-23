import React from 'react';

function AvatarCard({showHouse, personaje, selectPersonaje, changePage}){

    let house;

    if(showHouse){
        house = <img className={"casa-img "+ personaje.casa.toLowerCase() + "-casa-img"} src={process.env.PUBLIC_URL + '/imgs/' + personaje.casa.toLowerCase() + '-logo.png'}/>;
    } else {
        house = <div></div>
    }

    return (
        <div className="card avatar-card">
            <img className="avatar-epic-img" src={process.env.PUBLIC_URL + '/imgs/epics/' + personaje.personaje.toLowerCase() + '-epic.png'}/>
            <img className="avatar-img" src={process.env.PUBLIC_URL + '/imgs/avatars/' + personaje.personaje.toLowerCase() + '-avatar.png'}/>
            <div className="avatar-name">{personaje.personaje}</div>
            <div className="avatar-character-name">{personaje.nombrePersonaje} | <i>{personaje.year}</i></div>
            <div className="avatar-bio">{personaje.biografia}</div>
            <div className="avatar-footer">
                {house}
                <button
                    className="btn-avatar"
                    onClick={() =>{ selectPersonaje(personaje); changePage('NEW-HERO')}}>Ver más...</button>
            </div>
        </div>
    );
}

export default AvatarCard;