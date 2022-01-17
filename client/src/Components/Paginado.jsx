import React from "react";
import Styles from "./Paginado.module.css"

export default function Paginado ({dogsPerPage, allDogs, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className = {Styles.pagination}>
                {pageNumbers?.map(number => (
                    <li key={number}>
                        <button /* href="http://localhost:3000/home" */ onClick = {() => paginado(number)}>
                            {number}
                        </button>
                    </li>
                ))} </ul>
        </nav>
    ) 
}