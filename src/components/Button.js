import React from 'react'
import "./Button.css"
import { Link } from 'react-router-dom'

const STYLES = ["btn--primary","btn--outline"];

const SIZES = ["btn--medium","btn--large"];

export const Button = ({children,type,navigateTo,videoId,onClick,buttonStyle,buttonSize})=>{
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    //Si el estilo que recibimos no esta en la lista, ponemos un default
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <Link to={navigateTo} state={videoId} className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}>
                {children}
            </button>
        </Link>
    )
};