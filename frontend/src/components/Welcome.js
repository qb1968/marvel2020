import React from 'react'
import allcharacters from '../images/allcharacters.png'
import {Fade} from 'react-awesome-reveal'
import {Button} from 'react-bootstrap'

function Welcome() {
    return (
        
     <section className="welcome">
 
        <div className="container">
            <Fade  duration={7000}>
            <img src={allcharacters} className="allcharacters" alt="allcharacters"/>
            </Fade>
            
            
            <Button href="/characters_:pageNumber" className="btn1" size="lg">ENTER</Button>
            
           
        </div>
 
     </section>
    
    )
}

export default Welcome
