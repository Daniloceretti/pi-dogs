import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllDogs, getTemperaments, filterByTemperaments, filterCreated, orderByName, orderByWeight } from '../Actions';
import Paginado from './Paginado';
import Card from './Card';
import SearchBar from './SearchBar';
import s from "./Home.module.css"
import carga from "../img/loading-11.gif"




function Home() {

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    //paginado
    const [currentPage, setCurrentPage] = useState(1)
    const dogsPerPage = 8
    const numbersOfLastDog = currentPage * dogsPerPage//1  * 8 = 8
    const numberOfFirtsDog = numbersOfLastDog - dogsPerPage// 8 - 8 = 0
    const currentDog = allDogs.slice(numberOfFirtsDog, numbersOfLastDog)
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
      
    }

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(filterByTemperaments())
        dispatch(getTemperaments())
    }, [dispatch])

    
    const temperaments = useSelector((state) => state.temperaments)
    const [temperament, setTemperament] = useState("All")

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs());
        setBreeds('all');
        setOrdenPorPeso("");
        setOrden("");
        setTemperament("All")
        setCurrentPage(1)

    }

    function handleSelect(e) {
        e.preventDefault()
        dispatch(filterByTemperaments(e.target.value))
        setTemperament(e.target.value)
        setCurrentPage(1)
    }


    
    const [, setBreeds] = useState('all')
    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setBreeds(e.target.value)
        setCurrentPage(1)

    }


   
    const [, setOrden] = useState('')
    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
        setOrdenPorPeso("")
    }


    
    const [, setOrdenPorPeso] = useState('')
    function handleSortWeight(e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrdenPorPeso(e.target.value)
        setOrden("")
    }

    return (
        <div className={s.fondo}>
            <div className={s.nav}>
                {/*         <h1 className={s.titulo}> Doggy Api </h1> */}
                <button className={s.botonreload} onClick={e => handleClick(e)}> Reload dogs </button>
                <SearchBar />

            </div>

            <div className={s.h1} >
                <Link  className={s.link}  to='/dogs/create'> <h2> Create a new dog </h2> </Link>
            </div>
            <div>

                <br />

                <div>
                    <span className={s.textofiltro} > Filter by weight  </span>

                    <select  className={s.textofiltroselect} onChange={e => handleSortWeight(e)}>
                        <option value="asc"> Lightest </option>
                        <option value="desc">  heaviest</option>
                    </select>

                    <span className={s.textofiltro} > Filter by order </span>
                    <select  className={s.textofiltroselect}  onChange={e => handleSort(e)}>
                        <option value="az"> A-Z</option>
                        <option value="za"> Z-A </option>
                    </select>


                    <span className={s.textofiltro} > Filter by breed </span>

                    <select   className={s.textofiltroselect}    onChange={e => handleFilterCreated(e)}>
                        <option value="all">All</option>
                        <option value="created">Created</option>
                        <option value="api"> Existentes</option>
                    </select>


                    <span className={s.textofiltro}> Filter by temperament </span>
                    <select  className={s.textofiltroselect}  value={temperament} onChange={(e) => handleSelect(e)}>
                        <option value="All"> All </option>
                        {temperaments.map((temp, index) => (
                            <option onClick={(e) => handleClick(e)} key={index}>
                                {temp.name}
                            </option>
                        ))}

                    </select>

                </div> 
                <br/>
                {currentDog.length === 0 ? <img  alt= {"Loading"} src={carga}/>: 


                currentDog?.map((el,index) => {
                    return (
                        <div key={index}>
                           
                                <Card
                                    id={el.id}
                                    name={el.name}
                                    image={el.image ? el.image : el.image}
                                    maxweight={el.maxweight}
                                    minweight={el.minweight}
                                    minheight={el.minheight}
                                    maxheight={el.maxheight}
                                    temperament={el.temperament}
                                    temperaments={el.temperaments?.map((t) => t.name).join(', ')}
                                />
                            
                            
                        </div>
                        
                    )
                })
                
                

                }
                
                    <div className={s.pag} >
                    {/*     <button onClick={() => paginado(currentPage === 23 ? currentPage : currentPage +1)}>Next</button>
                        <button onClick={() => paginado(currentPage-1)}>Prev</button> */}
                    <Paginado
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                    />
                </div>

            </div>›
        </div>
    )
}

export default Home
