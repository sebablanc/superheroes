import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function CarouselCharacters({list, extraClass = ''}){

    if(list.length<=0){
        return(
            <img className={"img-no-carousel "+ extraClass} src={process.env.PUBLIC_URL + '/imgs/no-heroe.jpg'}/>
        )
    }
    return(
        <Carousel className={extraClass}>
            {list.map((item, index) => 
                <div>
                    <img src={process.env.PUBLIC_URL + '/imgs/personajes/'+ item}/>
                </div>
            )}
        </Carousel>
    );
}

export default CarouselCharacters;