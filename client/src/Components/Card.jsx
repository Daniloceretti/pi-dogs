import React from 'react'
import {Link} from "react-router-dom"
import perrito from  "../img/fondodetail.jpeg"
import s from "./Card.module.css"


function Card({name, image,temperament, temperaments, minweight, maxweight, minheight, maxheight, id})

{
    return (
        <div className={s.card} >
             

            <h1 className={s.nombre}>  {name} </h1>

             <img className={s.img} src= {image || perrito} alt= "img not found" width="400px" height="250px" /> 

             {/* { image ?<img  className={s.img} src= {image} alt= "img not found" width= "400px" height="250px"/>:<img src = {perrito} alt = "imagen not found"/>}  */}

             <h5  className={s.temperament}  >Temperament:{temperaments}{Array.isArray(temperament)? temperament.join(', ' ) : temperament}</h5> 
             
            {/* <h5>     
             {temperament  ? temperament.map((el) => "  " + el + "") : temperaments?.map((el) => el.name + " ")</h5>   */}    


            <h5 className={s.weight} >Min Height:{minweight} kg - Max Height:{maxweight} kg</h5>
            <h5 className={s.weight}>Min Weight:{minheight} cm - Max Weight:{maxheight} cm</h5>

             <Link  className={s.link}to={'/home/' + id}></Link>

           
            
        </div>
    )
}

export default Card

