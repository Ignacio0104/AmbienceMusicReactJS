import React, { useRef, useState } from 'react'
import { useDispatch, useStore } from '../store/StoreProvider'
import CardItem from './CardItem'
import "./Cards.css"
import "./CardsMain.css"

function Cards(props) {

  const videos = useStore();
  const dispatch = useDispatch();
  const filterText = useRef();

  const [filteredList, setFilteredList] = useState(videos)

 const verifyThemeKeys = (video,text)=>{

    for (let index = 0; index < video.theme.length; index++) {
      if(video.theme[index].toLowerCase().startsWith(text.toLowerCase()))
      {
        return true;
      }
    }
  }

  const filterAction = ()=>{
    let videosCopy = videos;
    setFilteredList(videosCopy.filter((video)=>verifyThemeKeys(video,filterText.current.value)));
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
        <div className="form-container">
                <input ref={filterText} onChange={filterAction} className='input-text' type="text" placeholder="Search..."></input>
            </div>
      )}
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'> 
        {
          filteredList.map((video,index) => index < limit &&
          (
            <CardItem
              key={index}
              id={video.id}
              src={video.picture}
              name={video.name}
              label={video.theme}
            />)
        )}
        </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
