
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./UserProfile.css"

function UserProfile(props) {
  const history = useNavigate();
    const user = {
        name: localStorage.getItem("userName"),
        lastname: localStorage.getItem("lastname"),
        dateOfBirth: localStorage.getItem("dateOfBirth"),
        email: localStorage.getItem("email"),
        genre: localStorage.getItem("genre"),
        role: localStorage.getItem("role")
    }

    const logout = ()=>{     
      localStorage.clear();
      props.changeLogin(false);
      history("/");
    }
  return (
    <div className='profile-container'>
    <div className='profile-pic-container'>
      <img width="300px" height="300px" src={user.genre==="Female" ? "/images/icon-women-profile.png" :"/images/icon-men-profile.png"} alt="profile"></img>
      <p onClick={logout}>Logout <i class="fas fa-sign-out-alt"></i></p>
    </div>
    <div className='profile-info-container'>
      <h2> {user.name} {user.lastname}</h2>
      <h4> Date of Birth: {user.dateOfBirth}</h4>
      <h4> Email: {user.email}</h4>
    </div>
      
    </div>
  )
}

export default UserProfile
