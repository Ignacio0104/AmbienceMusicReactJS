import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Products from './components/pages/Videos';
import { useStore } from './store/StoreProvider';
import Blog from './components/pages/Blog';
import VideoPage from './components/pages/VideoPage';
import Videos from './components/pages/Videos';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/video' exact element={<VideoPage/>}/>
          <Route path='/blog' exact element={<Blog/>}/>
          <Route path='/videos-main' exact element={<Videos/>}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
