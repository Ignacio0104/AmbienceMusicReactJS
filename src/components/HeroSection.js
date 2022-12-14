import React, { useEffect, useState } from 'react'
import "../App.css"
import { useStore } from '../store/StoreProvider'
import {Button} from "./Button"
import "./HeroSection.css"
import { Link } from 'react-router-dom'

function HeroSection() {

  const [randomId, setRandomId] = useState(0);

  useEffect(() => {
    getRandomId();
  }, [])

  const videos = useStore();

  let videosId=[];

  videos.map((video)=>videosId.push(video.id));

  const getRandomId = () =>{
    setRandomId(Math.floor(Math.random()*videos.length))
  }

  return (
    <div className='hero-container'>
      <video src='/videos/video-main.mp4'  type="video/mp4"  autoPlay loop muted />
      <h1>JUST RELAX AND FOCUS</h1>
      <p>Get your work done with us!</p>
      <div className='hero-btns'>
        <Button className="btns" videoId={videos[randomId].id} onClick={getRandomId} buttonStyle="btn--primary"
        buttonSize="btn--large" navigateTo={"/video"}>
            RANDOM VIDEO <i className='far fa-play-circle'/>
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
