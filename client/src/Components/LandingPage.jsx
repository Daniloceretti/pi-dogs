import React from 'react';
//import {Link} from 'react-router-dom';
import s from "./LandingPage.module.css"

export default function LandingPage () {
    return (
        <div className={s.landing} >
            <h1 className={s.h1} >Welcome to api Dogs!</h1>
            <button to= "/home">
                <button className={s.btn2}>Let's go ...</button>
            </button>
        </div>
    )
}

//linea 9 va LINK