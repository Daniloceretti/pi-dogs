import React, { useState, useEffect } from 'react';
import { createDog, getTemperaments } from '../Actions';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import s from './CreateDog.module.css'



function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required'
    } else if (parseInt(input.name)) {
        errors.name = 'Name is invalid, write a text'
    }
    if (!input.image) {
        errors.image = "Image required"
    }
    if (!input.life_span) {
        errors.life_span = 'Life span is required'
    } else if (input.life_span < 1 || input.life_span > 20) {
        errors.life_span = 'Write a number beetwen 1 - 20'   
    }
    if (!input.minweight) {
        errors.minweight = 'Minimum weight is required'
    } else if (Number(input.minweight) <= 0 || Number(input.minweight >= 100)) {
        errors.minweight = 'Write a number beetwen 0 - 100'    
    }
    if (!input.maxweight) {
        errors.maxweight = 'Maximum weight is required'
    } else if (Number(input.maxweight) <= 0 || Number(input.maxweight < Number(input.minweight) || Number(input.maxweight > 100))) {
        errors.maxweight = 'Write a number beetwen 0- 100'
    }
    if (!input.minheight) {
        errors.minheight = 'Minimum height is required'
    } else if (Number(input.minheight) <= 0 || Number(input.minheight) >= 100) {
        errors.minheight = 'Write a number beetwen 0 - 100'
    }
    if (!input.maxheight) {
        errors.maxheight = 'Minimum height is required'
    } else if (Number(input.maxheight) <= 0 || Number(input.maxheight) < Number(input.minheight) || Number(input.maxheight) > 100) {
        errors.maxheight = 'Write a number beetwen 0- 100'
    }
    if (!input.temperaments){
        errors.temperaments=" falta temperamnets"
    }
    return errors
}


export default function PostDog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments)

    const [errors, setErrors] = useState("")

    const [input, setInput] = useState({
        name: "",
        life_span: "",
        minweight: "",
        maxweight: "",
        minheight: "",
        maxheight: "",
        image: "",
        temperament: []
    });

    //handles
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelect(e) {
        if (input.temperament.includes(e.target.value)) {
            alert("Already in the list");
        } else {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(el => el !== e)
        })
    }
    function handleSubmit(e) {
        if (input.name && input.life_span && input.minweight && input.maxweight && input.minheight && input.maxheight && input.image && input.temperament)
        
        {
            e.preventDefault();
            dispatch(createDog(input))
           
            alert("Success! Your dog was created")
            setInput({
                name: "",
                life_span: "",
                minweight: "",
                maxweight: "",
                minheight: "",
                maxheight: "",
                image: "",
                temperament: []
            })
            history.push("/home")

        }
        
           else {
            alert("Datos incompletos")
} 
 


    }
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])


    return (

        <div className={s.fondo}>


            <div className={s.titulo} >
                
                <span className={s.titulotexto}>

                    CREATE YOUR OWN BREED OF DOG
                </span>

            </div>
            <div className={s.center}>

                <form onSubmit={e => { handleSubmit(e) }}>
                    <div >
                        <label className={s.label}>Name:</label>
                        <input
                            placeholder=" Dog name"
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)} />
                            <div className={s.h2e}>
                            {errors.name && (
                                <p className='error'>{errors.name}</p>
                            )}
                        </div>
                    </div>

                    <br />
                    <div>
                        <label className={s.label} >Picture:</label>
                        <input
                            type="url"
                            value={input.image}
                            name="image"
                            onChange={(e) => handleChange(e)} />
                        <div className={s.h2e} >
                            {errors.image && (<p className='error'>{errors.image}</p>)}

                        </div>

                    </div>
                    <br />
                    <div>
                        <label className={s.label} >Min weight:</label>
                        <input
                            type="number"
                            min="0"
                            placeholder='Minimum weight...'
                            value={input.minweight}
                            name="minweight"
                            onChange={(e) => handleChange(e)}
                        />
                        <div className={s.h2e} >
                            {errors.minweight && (<p className='error'>{errors.minweight}</p>)}
                            {/* <label> kgs </label> */}

                        </div>
                    </div>

                    <br />
                    <div>
                        <label className={s.label}  >Max weight:</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Maximum weight..."
                            value={input.maxweight}
                            name="maxweight"
                            onChange={(e) => handleChange(e)} />
                        {/* <label> kgs </label> */}
                        <div className={s.h2e} >

                            {errors.maxweight && (<p className='error'>{errors.maxweight}</p>)}
                        </div>
                    </div>
                    <br />
                    <div>
                        <label className={s.label}  >Min height:</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Minimum height..."
                            value={input.minheight}
                            name="minheight"
                            onChange={(e) => handleChange(e)} />
                        {/*  <label> cms </label> */}
                        <div className={s.h2e}  >
                            {errors.minheight && (<p className='error'>{errors.minheight}</p>)}
                        </div>

                    </div>
                    <br />
                    <div>
                        <label className={s.label}  >Max height:</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Maximum height..."
                            value={input.maxheight}
                            name="maxheight"
                            onChange={(e) => handleChange(e)} />
                        {/* <label  > cms </label> */}
                        <div className={s.h2e}  >
                            {errors.maxheight && (<p className='error'>{errors.maxheight}</p>)}

                        </div>
                    </div>

                    <br />
                    <div>
                        <label className={s.label}  >Life span:</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Dog's life span"
                            value={input.life_span}
                            name="life_span"
                            onChange={(e) => handleChange(e)} />
                        {/* <label  > cms </label> */}
                        <div className={s.h2e}  >
                            {errors.life_span && (<p className='error'>{errors.life_span}</p>)}

                        </div>
                    </div>
                    <br />
                    <label className={s.conteinTemp} >Temperaments:</label>
                    <select  onChange={(e) => handleSelect(e)}>
                        {temperaments?.map((el,i) => (<option value={el.name} key={i}
                        >{el.name}</option>))}
                         {errors.temperaments && (
                            <p className = 'error'>{errors.temperaments}</p>
                        )}  
                    </select>
                    
                    <div className={s.tempcontrol} >
                        {input.temperament.map((el,i ) => <li  key={i}  className={s.temps} > {el}<button type='reset'  onClick={() => handleDelete(el)} className={s.x} > X </button></li>)}
                    </div>

                    <div>
                        <button className={s.button} disabled={input.temperament.length === 0 || Object.keys(errors).length > 0} type='submit'> Create your own dog</button>
                    </div>


                </form>


                <Link to="/home"> <button className={s.btn}>RETURN TO HOME </button></Link>

            </div>
        </div>
    )
}