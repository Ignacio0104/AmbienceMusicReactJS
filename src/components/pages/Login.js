import React, { useState } from 'react'
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

function Login(props) {
    const [register, setRegister] = useState(false);

    const changeRegister = (boolean)=> setRegister(boolean)
    
  return (
    <div>
      {
        register?
        (<RegisterForm changeRegister={changeRegister}></RegisterForm>)
        :
        (<LoginForm changeRegister={changeRegister} changeLogin={props.actionLogin}></LoginForm>)
      }
    </div>
  )
}

export default Login
