import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import s from "./Detail.module.css";
import perrito from  "../img/fondodetail.jpeg"



export default function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id));

    },[dispatch,id])

    const detailDog = useSelector((state) => state.detail)
    console.log(detailDog)
    


    return (

        <div className={s.fondo} >

            {      
                   detailDog.length === 0 ? <p className={s.loading} >Loading...</p> :
                    detailDog.length > 0 &&

                    <div className={s.container}>
                        <h1 className={s.h1} >  {detailDog[0].name}</h1>
                        <img className={s.image}src={detailDog[0].image} onError={e => {e.target.src=perrito;}}  alt='img not found' width="400px" height="250px" />

                         <h2 className={s.title}>Temperaments:</h2><p className={s.descriptions}>{detailDog[0].createdInDataBase? detailDog[0].temperaments.map(el => el.name ).join(', '): detailDog[0].temperament.split(', ').map(e => e ).join(', ')}  </p> 
                        

                        <h2 className={s.title} >Weight:</h2><p  className={s.descriptions}  >{detailDog[0].minweight} kgs -  {detailDog[0].maxweight} kgs </p>

                        <h2 className={s.title} >Height:</h2> <p  className={s.descriptions} > {detailDog[0].minheight} cm - {detailDog[0].maxheight} cm   </p> 

                        <h2 className={s.title} >Life Span: </h2> <p  className={s.descriptions} > {detailDog[0].life_span} </p> 
                         < a href='/home'> 

                            <button  className={s.button}>Return home</button>
                         </a>
                    </div>

            }
           
        </div>

    )

}
