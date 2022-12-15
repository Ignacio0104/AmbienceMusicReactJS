import React, { useState } from "react";
import "../../App.css"
import HeroSection from "../HeroSection"
import Cards from "../Cards";
import Footer from "../Footer";
import { useStore } from "../../store/StoreProvider";
import Spinner from "../Spinner";
import  {firebaseApp}  from "../../credentials";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs,doc,deleteDoc,getDoc,setDoc} from "firebase/firestore"
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS


function Home(props){

    const videos = useStore();

    const getVideos= async()=>{
        try{
            const querySnapshot = await getDocs(collection(db,"videos"));
            const registers = [];
            querySnapshot.forEach((doc)=>{
                registers.push({...doc.data(), id:doc.id})
            })
            return registers;
        }catch(err){
            console.log(err)
            return [{}];
        }
    }
    

   /* const [registro, setRegistro] = useState(false);  //REGISTRO A BASE DE DATOS

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const correo = e.target.email.value;
        const clave = e.target.clave.value;
        if(registro)
        {
            await createUserWithEmailAndPassword(auth,correo,clave);
        }else{
            await signInWithEmailAndPassword(auth,correo,clave)
        }
    }*/
    return(
        <>
            {/* <h1>Hola {props.correo.usuario?.mail}</h1>
            <form onSubmit={handleSubmit}>
                <input id="email" type="email"></input>
                <input id="clave" type="text"></input>
                <button type="submit">Submit </button>
            </form> */}
            <Spinner load={getVideos}></Spinner>
            {
                //while()
            }
            <HeroSection/>
            <Cards limit={3}></Cards>
            <Footer></Footer>
        </>
    );
}

export default Home;