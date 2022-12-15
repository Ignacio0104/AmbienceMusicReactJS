import React, { useEffect, useState } from 'react'
import { useDispatch } from '../store/StoreProvider';
import "./Spinner.css"

function Spinner(props) {

    const [spinnerVisible, setSpinnerVisible] = useState(true);
    const dispatch = useDispatch();


    const hideSpinner = async()=>{     
        let response = await props.load();
        if(response!== null && response.length>0)
        {
           dispatch({
            type: "UPDATE_ALL",
            payload:{
              list: response
            }
           })
           setSpinnerVisible(false)
           props.loading();
        }else{
          console.log("Hubo un problema")
        }
    }
    

  return (
    <div onLoad={hideSpinner} className={`${spinnerVisible ? "spinner-container" : "spinner-hide"}`}>
        <img src="/images/1495.gif" className="spinner-item" alt='spinner loader'/> 
    </div>
  )
}

export default Spinner
