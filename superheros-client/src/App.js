import {useState} from 'react';
import Header from './components/header';
import Home from './components/home';
import MarvelCharacters from './components/marvel-characters';
import DCCharacters from './components/dc-characters';
import NewHero from './components/new-hero';
import './App.css';

function App() {
  const [page, setPage] = useState('HOME');
  const [personajeSelected, setPersonajeSelected] = useState({nombre: "Batman"});

  const changePage = (pageChanged) => {
    setPage(pageChanged);
  };

  function renderSwitch(){
    switch(page) {
      case 'HOME':
        return(
          <Home selectPersonaje={setPersonajeSelected} changePage={changePage} />
        )
      case 'MARVEL':
        return(
          <MarvelCharacters selectPersonaje={setPersonajeSelected} changePage={changePage} />
        )
      case 'DC':
          return(
            <DCCharacters selectPersonaje={setPersonajeSelected} changePage={changePage} />
          )
      case 'NEW-HERO':
        return(
          <NewHero
            personajeSelected={personajeSelected}
            changePage={changePage} />
        )
      default:
        return(
          <Home changePage={changePage} />
        )
    }
  }

  return (
    <div> 
      <Header changePage={changePage}/>
      {renderSwitch()}
   </div>
  );
}

export default App;
