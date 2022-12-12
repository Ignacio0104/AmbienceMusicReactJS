import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import Products from './components/pages/Products';
import { useStore } from './store/StoreProvider';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Switch>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/services' exact element={<Services/>}/>
          <Route path='/sign-up' exact element={<SignUp/>}/>
          <Route path='/products' exact element={<Products/>}/>
        </Switch>
    </Router>
    </>
  );
}

export default App;
