import React, { useEffect, useState } from 'react'
import "./Video.css"
import { useDispatch, useStore } from '../store/StoreProvider';
import  {firebaseApp}  from "../credentials";
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import PomodoroClock from './PomodoroClock';

function Video(props) {
    const dispatch = useDispatch();
    const [pomodoroVisible, setPomodoroVisible] = useState(false)
    const state = useStore();
    const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

    useEffect(() => {
        increaseViewsByOne();
    }, [])

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
                    <iframe className="video-image" src={props.video[0].url} title="Youtube video" allo></iframe>
                    <p>{props.video[0].description}</p>
                </div>
            </div>
            <button onClick={tooglePomodoro}>Pomodoro </button>
            {
              pomodoroVisible && <PomodoroClock></PomodoroClock>
            }       
        </div>

    </div>
  )
}

export default Video
