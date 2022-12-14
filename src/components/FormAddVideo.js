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
    const validateName = ()=>{
        if(nameText.current.value.length > 5)
            setNameError(false)
        else 
            setNameError(true)
    }
    const validateUrl = ()=>{
        setUrlError(!urlText.current.value.includes("www.youtube.com/embed"))
    }
   
    const validateLabel = ()=>{
        setLabelsError(labels.length<0);
    }
    const validatePicture = ()=>{
        setPictureError(!pictureText.current.value.includes("https://") && 
        (!pictureText.current.value.includes("jpg")||!pictureText.current.value.includes("jpeg")
        ||!pictureText.current.value.includes("bmp")));
    }

    const validateDescription = ()=>{
        setDescriptionError(descriptionText.current.value<30)
    }

    const validateFields =(e)=>{
        e.preventDefault();
        validateName();
        validateUrl();
        validateLabel();
        validatePicture();
        validateDescription();
    }
    
  return (
    <div className='form-add-container'>
        <form className='form-add'>
            <input type="text" ref={nameText} placeholder="name"/>
            {nameError && <p className='error-label-left-top'>Please verify the name</p>}
            <input type="text" ref={urlText} placeholder="url"></input>
            {urlError && <p className='error-label-right-top'>Please verify the URL</p>}
            <input type="text" ref={labelText} placeholder="labels"></input>
            {labelsError && <p className='error-label-center'>Please verify the label</p>}
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
            <input type="text" className='picture-input' ref={pictureText} placeholder="picture"></input>
            {pictureError && <p className='error-label-left-middle'>Please verify the pictura</p>}
            <textarea type="text" className='description-input' ref={descriptionText} placeholder="description"></textarea>
            {descriptionError && <p className='error-label-bottom'>Please verify the description</p>}
            <button type='submit' onClick={validateFields}> Submit </button>
        </form>
    </div>
  )
}

export default FormAddVideo
