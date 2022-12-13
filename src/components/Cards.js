import React from 'react'
import { useStore } from '../store/StoreProvider'
import CardItem from './CardItem'
import "./Cards.css"

function Cards() {

  const videos = useStore();

  return (
    <div className='cards'>
      <h1>Check out our top videos!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'> 
        {videos.map((video,index) => index <3 &&
          (
            <CardItem
              key={index}
              id={video.id}
              src={video.picture}
              name={video.name}
              label={video.theme}
              path="/services"
            />)
        )}
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
