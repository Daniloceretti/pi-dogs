import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getNameDog} from '../Actions';

import s from "./SearchBar.module.css"


export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

function handleInputChange (e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
      }
//guardo lo que va tipeando el usuario en mi estado local, y eso es lo que le llega al back como peticion

function handleSubmit(e){
    e.preventDefault();
    if(name.length === 0) {
        return (
            alert ("Please write a name")
        )
        
    }else{
        dispatch(getNameDog(name));
        setName("")
    }
          
         }
    return (
        <div className={s.contenedorsearch} >
            <input className={s.inputSearch}
            type = "text"
            placeholder='Search dog breed'
            value={name}
            onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            onChange = {(e) => handleInputChange(e)}/>
            <button className={s.search} onClick = {(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}