import React, { useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Products from './components/pages/Videos';
import { useStore } from './store/StoreProvider';
import Blog from './components/pages/Blog';
import VideoPage from './components/pages/VideoPage';
import Videos from './components/pages/Videos';
import FormAdd from './components/pages/FormAdd';
import RegisterForm from './components/RegisterForm';
import  {firebaseApp}  from "./credentials";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';

const auth = getAuth(firebaseApp);

function App() {

  const [userLoggedIn, setuserLoggedIn] = useState(false);

  const changeLoggenInState = (boolean)=>{
    setuserLoggedIn(boolean)
  }

  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/video' exact element={<VideoPage/>}/>
          <Route path='/blog' exact element={<Blog/>}/>
          <Route path='/videos-main' exact element={<Videos/>}/>
          <Route path='/add-video' exact element={<FormAdd />}/>
          <Route path='/sign-in' exact element={<Login actionLogin={changeLoggenInState}/>}/>
          <Route path='/profile' exact element={<Profile/>}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
