import React, { useEffect, useState } from 'react'
import { useDispatch } from '../store/StoreProvider';
import { getVideos } from '../store/storeReducer';
import "./Spinner.css"

function Spinner() {

  return (
    <div className="spinner-container">
        <img src="/images/1495.gif" className="spinner-item" alt='spinner loader'/> 
    </div>
  )
}

export default Spinner
