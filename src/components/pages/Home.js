import React, { useEffect, useState } from "react";
import "../../App.css"
import HeroSection from "../HeroSection"
import Cards from "../Cards";
import Footer from "../Footer";
import { useDispatch, useStore } from "../../store/StoreProvider";
import Spinner from "../Spinner";
import  {firebaseApp}  from "../../credentials";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc} from "firebase/firestore"
import { getVideos } from "../../store/storeReducer";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS


function Home(props){

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchVideos = async()=>{     
        let response = await getVideos();
        if(response!== null && response.length>0)
        {
           dispatch({
            type: "UPDATE_ALL",
            payload:{
              list: response
            }
           })
           setIsLoading(false)
           props.loading();
        }else{
          console.log("Hubo un problema")
        }
    }
    

    useEffect(() => {
        fetchVideos();
    }, [])
    
    return(
        <>    
            {
                isLoading && <Spinner></Spinner> 
            }       
            <HeroSection/>
            {
                !isLoading  &&  <Cards limit={3}></Cards>
            }
            <Footer></Footer>
        </>
    );
}

export default Home;