import React, { useRef, useState } from 'react'
import { useDispatch, useStore } from '../store/StoreProvider'
import CardItem from './CardItem'
import "./Cards.css"
import "./CardsMain.css"
import {Button} from "./Button"

function Cards(props) {

  const videos = useStore();
  const dispatch = useDispatch();
  const filterText = useRef();

  const [filteredList, setFilteredList] = useState(videos)

 const verifyKeyWords = (video,text)=>{

    for (let index = 0; index < video.theme.length; index++) {
      if(video.theme[index].toLowerCase().startsWith(text.toLowerCase()) 
      || video.name.toLowerCase().startsWith(text.toLowerCase()))
      {
        return true;
      }
    }
  }

  const filterAction = ()=>{
    let videosCopy = videos;
    setFilteredList(videosCopy.filter((video)=>verifyKeyWords(video,filterText.current.value)));
  }

  const addVideo = ()=>{
    dispatch(
      {
        type: "ADD",
        payload:{
          id:3,
          name:"Coding Session - Lofi Hip Hop Mix [ Coding Lofi Mix | Coding Music ]", 
          url:"https://www.youtube.com/embed/qZjWUkohSQg",
          theme: ["LoFi","relax","coding","Hip Hop"],
          picture: "https://i.ytimg.com/vi/qZjWUkohSQg/maxresdefault.jpg",
          description: "Welcome to Lofi Boost Your Mood Thank you all for watching and enjoying this Coding Lofi Mix Wish you happy listening"
        }
      }
    )
  }
  let limit = props.limit ? props.limit : videos.length+1;

  return (
    <div className='cards'>
      <h1>{props.limit  && "Check out our top videos!"}</h1>
      { !props.limit && 
      (
        <div>
          <div className="form-container">
                  <input ref={filterText} onChange={filterAction} className='input-text' type="text" placeholder="Search..."></input>
                  <p>Type your keywords (For example: "relax", "Harry Potter", "Beach", etc)</p>
          </div>
          <div className='button-container'>
              <Button className="btns" buttonStyle="btn--primary"
              buttonSize="btn--large" navigateTo={"/add-video"}>
                  Add video <i class="fas fa-plus-circle"></i>
              </Button>
              
          </div>
        </div>
        
      )}
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'> 
        {
          filteredList.length>0 ?
          filteredList.map((video,index) => index < limit &&
          (
            <CardItem
              key={index}
              id={video.id}
              src={video.picture}
              name={video.name}
              label={video.theme}
            />)):
            (
              <h1 className='no-results'>No videos found...</h1>
            )    
        }
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
