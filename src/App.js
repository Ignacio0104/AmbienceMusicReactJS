import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Products from './components/pages/Products';
import { useStore } from './store/StoreProvider';
import Videos from './components/pages/Videos';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/videos' exact element={<Videos/>}/>
          <Route path='/sign-up' exact element={<SignUp/>}/>
          <Route path='/products' exact element={<Products/>}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
