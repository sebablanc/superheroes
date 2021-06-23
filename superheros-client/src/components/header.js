import React, { useState } from 'react';
import logo from '../assets/page-logo.png';

function Header({changePage}){
    const [page, setPage] = useState('HOME');
    return (
        <div className={"app-header "+ (page=='DC' ? ' dc-header':'')}>
            <img className="header-img" src={logo} onClick={()=>{changePage('HOME')}}/>
            <div className="header-links-container">
                <a className="header-link" onClick={()=>{setPage(''); changePage('HOME')}}>Home</a>
                <a className="header-link" onClick={()=>{setPage('MARVEL'); changePage('MARVEL')}}>Marvel</a>
                <a className="header-link" onClick={()=>{setPage('DC'); changePage('DC')}}>DC</a>
            </div>
        </div>
    );
}

export default Header;