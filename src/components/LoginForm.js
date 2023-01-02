import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from '../store/StoreProvider';
import "./LoginForm.css"

import  {firebaseApp}  from "../credentials";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,getDocs, query, where} from "firebase/firestore"

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

function LoginForm(props) {
    const [loginError, setLoginError] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [allowSubmit, setAllowSubmit] = useState(false);
    const userNameText = useRef();
    const passwordLoginText = useRef();

    const history = useNavigate();

  const toogleVisibility = (e)=>{
    if(e.current.type==="text")
    {
        e.current.type = "password"
        setPasswordVisible(false)
    }else{
        e.current.type = "text"
        setPasswordVisible(true)
    }
  }

    const enableButton = ()=>{   
         setAllowSubmit(true);      
    }

    const buildRequest = async(userId)=>{
        const q = query(collection(db, "users"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let user = doc._document.data.value.mapValue.fields;
            if(user !=null)
            {
                let favoritesList = user.favorites.arrayValue.values
                console.log(user)
                localStorage.setItem("userName",user.name.stringValue);
                localStorage.setItem("lastname",user.lastname.stringValue);
                localStorage.setItem("dateOfBirth",user.dateOfBirth.stringValue);
                localStorage.setItem("email",user.email.stringValue);
                localStorage.setItem("genre",user.genre.stringValue);
                localStorage.setItem("role",user.role.stringValue);
                localStorage.setItem("userId",user.userId.stringValue);
                localStorage.setItem("docId",doc._document.key.path.segments[6]);
                localStorage.setItem("favorites",JSON.stringify(favoritesList))
                props.changeLogin(true);
                history("/");
            }
        })
    }

    const loginRequest = async()=>{
        try{
            await signInWithEmailAndPassword(auth,userNameText.current.value,passwordLoginText.current.value)
            .then((response)=> buildRequest(response.user.uid))
            .catch(setLoginError(false))
        }catch(err){
            setLoginError(true);
            console.log(err)
        }
   
    }
    
    const login = (e)=>{
        e.preventDefault();
        loginRequest();
    }
    
  return (
    <div className='form-main'>
    <img className='background-register' src='images/background-registerform.jpg' alt='background'></img>
        <div className='form-add-container'>       
            <form className='form-login'>
                <input type="text" onBlur={enableButton} ref={userNameText} placeholder="Mail"/>
                <div className='password-container'>
                    <input type="password" onBlur={enableButton} ref={passwordLoginText} placeholder="Password"></input>           
                    <i onClick={()=>toogleVisibility(passwordLoginText)} class={`${passwordVisible ? "fas fa-eye" : "fas fa-eye-slash" }`}></i>
                </div>    
                <p> {loginError && "Please verify information. Username and/or password are wrong"}</p>           
                <button type='submit' disabled={allowSubmit ? false : true} onClick={login}> Login </button>
                <h4> Don't have an account? Sing up <span className="click-text" onClick={()=>props.changeRegister(true)}>here</span></h4>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
