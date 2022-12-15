import React, { useEffect, useState } from 'react'
import "./Spinner.css"

function Spinner() {

    const [spinnerVisible, setSpinnerVisible] = useState(true);

    useEffect(() => {
      setTimeout(()=> setSpinnerVisible(false),500)
    
    }, [])
    

  return (
    <div className={`${spinnerVisible ? "spinner-container" : "spinner-hide"}`}>
        <img src="/images/1495.gif" className="spinner-item" alt='spinner loader'/> 
    </div>
  )
}

export default Spinner
