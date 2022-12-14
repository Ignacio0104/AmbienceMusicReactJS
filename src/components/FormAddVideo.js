import React, { useRef, useState } from 'react'
import "./FormAddVideo.css"

function FormAddVideo() {
    const [labels, setLabels] = useState([])

    const labelText = useRef()

    const addLabel = ()=>{
        setLabels([...labels, labelText.current.value])
    }

    const deleteLabel = (labelSelected)=>{
        setLabels(labels.filter((label)=>label!==labelSelected));
    }
    
  return (
    <div className='form-add-container'>
        <form className='form-add'>
            <input type="text" placeholder="name"></input>
            <input type="text" placeholder="url"></input>
            <input type="text" ref={labelText} placeholder="labels"></input>
            <i className="plus-btn fas fa-plus" onClick={addLabel}></i>
            {labels.length > 0 ? 
            (
                <div className='labels-container'>
                    {labels.map((label)=> (<p> <i className="plus-btn fas fa-minus-circle" onClick={()=>deleteLabel(label)}></i> {label}</p>))}
                </div>
            ):
            (
                <div className='labels-container'>
                    <p>There are no labels added</p>
                </div>
            )}
            <input type="text" placeholder="picture"></input>
            <input type="text" placeholder="description"></input>
            <button> Submit </button>
        </form>
    </div>
  )
}

export default FormAddVideo
