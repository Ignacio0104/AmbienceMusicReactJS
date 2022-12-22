import React, { useEffect } from 'react'
import "./Video.css"
import { useDispatch } from '../store/StoreProvider';

function Video(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        increaseViewsByOne();
    }, [])

    const increaseViewsByOne = ()=>{
        dispatch(
            {
              type: "INCREASE_VIEWS",
              payload:{
                id: props.video[0].id
              }
            }
          )
    }
    
  return (
        <div className="videoPage" onLoad={console.log(props.video)}>
            <div className="video-container">
            <div className="video-item">
                <div className="video-info">
                    <h1 className="video-title"> {props.video[0].name} </h1>
                    <iframe className="video-image" src={props.video[0].url} title="Youtube video" allo></iframe>
                    <p>{props.video[0].description}</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Video
