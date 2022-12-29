import React, { useRef, useState } from 'react'
import { useDispatch, useStore } from '../store/StoreProvider'
import CardItem from './CardItem'
import "./Cards.css"
import "./CardsMain.css"
import {Button} from "./Button"
import { deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import  {firebaseApp}  from "../credentials";

function Cards(props) {

  const videos = useStore();
  const dispatch = useDispatch();
  const filterText = useRef();
  const [editionMode, setEditionMode] = useState(false)
  
  videos.sort((vOne,vTwo)=>vTwo.views-vOne.views)

  const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

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

  let limit = props.limit ? props.limit : videos.length+1;
  
  /*const deleteVideo= async(id)=>{
    alert(id)
    await deleteDoc(doc(db,"videos",id))
    dispatch({
        type: "DELETE",
        payload:{
            id: id
        } 
    })
}*/

   const getOne = async (id)=>{
      try {
        const docRef = doc(db,"videos",id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data);
      } catch (error) {
        console.log(error)
      }
   }

  const updateVideo = async(id)=>{
      await setDoc(doc(db,"videos",id),{
        //Toda la informacion
        id: id,
        nombre: id
      })
  }


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
          
          {
            localStorage.getItem("role")==="admin" &&
            (
              <div className='button-container-videos'>
                <Button className="btns" buttonStyle="btn--primary"
                buttonSize="btn--large" onClick={()=>setEditionMode(!editionMode)}>
                    Edit videos <i className="fas fa-pen-square"></i>
                </Button>
                <Button className="btns" buttonStyle="btn--primary"
                buttonSize="btn--large" navigateTo={"/add-video"}>
                    Add video <i className="fas fa-plus-circle"></i>
                </Button>
              </div>
            )
          }     

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
              edition={editionMode}
              url={video.url}
              description={video.description}
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
