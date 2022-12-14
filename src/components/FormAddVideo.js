import React, { useRef, useState } from 'react'
import "./FormAddVideo.css"

function FormAddVideo() {
    const [labels, setLabels] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [labelsError, setLabelsError] = useState(false);
    const [pictureError, setPictureError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const labelText = useRef();
    const nameText = useRef();
    const urlText = useRef();
    const pictureText = useRef();
    const descriptionText = useRef();

    const addLabel = ()=>{
        setLabels([...labels, labelText.current.value])
    }

    const deleteLabel = (labelSelected)=>{
        setLabels(labels.filter((label)=>label!==labelSelected));
    }



    const validateName = (input)=>{
        if(nameText.current.value.length > 5)
        {
            input.setCustomValidity("")
        }else{
            input.setCustomValidity("Please verify")
        }
    }
    
  return (
    <div className='form-add-container'>
        <form className='form-add'>
            <input type="text" ref={nameText} 
             onInput="validateName(this);" 
             onInvalid="validateName(this);" 
             placeholder="name"/>
            {nameError && <p className='error-label'>Please verify the name</p>}
            <input type="text" ref={urlText} placeholder="url"></input>
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
            <input type="text" ref={pictureText} placeholder="picture"></input>
            <input type="text" ref={descriptionText} placeholder="description"></input>
            <button> Submit </button>
        </form>
    </div>
  )
}

export default FormAddVideo
