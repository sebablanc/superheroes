import React from 'react';

function SearchBar({onChange}){
    return(
        <div className="searcher-container">
            <div className="searcher-anclaje">
                <form id="search-form" action="get">
                    <input 
                        type="text"
                        className="search_bar"
                        placeholder="Buscar tu personaje favorito"
                        onChange={(e) => { onChange(e.target.value) }} />
                    <input
                        className="search_submit"
                        type="submit" />
                    <div className="search_alternador"></div>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;