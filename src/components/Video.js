import React, { useEffect, useState } from 'react'
import "./Video.css"
import { useDispatch, useStore } from '../store/StoreProvider';
import  {firebaseApp}  from "../credentials";
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import PomodoroClock from './PomodoroClock';
import { async } from '@firebase/util';

function Video(props) {
    const dispatch = useDispatch();
    const [pomodoroVisible, setPomodoroVisible] = useState(false);
    const [favorite, setFavorite] = useState(false)
    const state = useStore();
    const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS
    let favoriteList = JSON.parse(localStorage.getItem("favorites"));

    useEffect(() => {
        increaseViewsByOne();
        checkFavorite(props.video[0].id);
    }, [])

    const checkFavorite = async (id)=>{
      console.log(favoriteList)
      favoriteList.map((item)=>{
          if(item.stringValue.trim() === id.trim()){
            setFavorite(true)
          }
        })
   }

   const updateFavorites = async()=>{
    const userReference = doc(db, "users", localStorage.getItem("docId"));
    if(favorite){
      favoriteList = favoriteList.filter((id)=>{
          return id.stringValue.trim()!==props.video[0].id.trim()}
        );  
        setFavorite(false);
    }else{
      if (favoriteList.find(e => e.stringValue.trim() === props.video[0].id.trim())) {
        console.log("Already Favorite")
      }else{
        favoriteList.push({"stringValue":props.video[0].id.trim()})
        setFavorite(true);
      }
    }
    let arrayFirebase = []
    favoriteList.map((item)=>arrayFirebase.push(item.stringValue.trim()))
    localStorage.setItem("favorites",JSON.stringify(favoriteList))
    await updateDoc(userReference, {
         favorites: arrayFirebase
       });
   }

    const tooglePomodoro = ()=>{
      setPomodoroVisible(!pomodoroVisible)
    }

    const increaseViewsByOne = async ()=>{
      let views = props.video[0].views + 1
        dispatch(
            {
              type: "INCREASE_VIEWS",
              payload:{
                id: props.video[0].id
              }
            }
          )
          const videoReference = doc(db, "videos", props.video[0].id);
          await updateDoc(videoReference, {
               views: views
             });
    }
    
  return (
        <div className="videoPage">
            <div className="video-container">
            <div className="video-item">
                <div className="video-info">
                    <h1 className="video-title"> {props.video[0].name} </h1>             
                    <iframe className="video-image" src={props.video[0].url} title="Youtube video" allowFullScreen></iframe>
                    <div className='information-container'>
                    <div className='favorite-container'>
                      <i class="fas fa-heart" onClick={updateFavorites} style={{color: favorite ? "red" : "gray"}}></i>
                      <p>{favorite ? "Remove from favorites" : "Add to favorites"}</p>
                    </div>
                      <p> Views: {props.video[0].views}</p>
                    </div>
                    <p>{props.video[0].description}</p>
                </div>
            </div>
            <div className='pomodoro-btn-container'>
              <button className='pomodoro-btn' onClick={tooglePomodoro}>{pomodoroVisible ? "Close" : "Pomodoro"} </button>
            </div>
            {
              pomodoroVisible && <PomodoroClock></PomodoroClock>
            } 
        </div>

    </div>
  )
}

export default Video
