import React, { useState } from 'react'
import {Link} from "react-router-dom"

function CardItem(props) {
  return (
    <>
        <li className='cards__item'>
            <Link className='cards__item__link' to="/video" state={props.id}>
                <figure className='cards__item__pic-wrap' data-category={props.label[0]}>
                    <img src={props.src} alt="Travel" className='cards__item__img'></img>
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{props.name}</h5>
                </div>
            </Link>
        </li>
    </>
  )
}

export default CardItem
