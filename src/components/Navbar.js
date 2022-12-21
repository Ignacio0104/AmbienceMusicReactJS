import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button';
import "./Navbar.css";

function Navbar() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true)
    const navigateTo = useNavigate()

    const handleClick = ()=>{
        setClick(!click);
    }

    const closeMobileMenu = ()=>{
        setClick(false);
    }
    
    const showButton = ()=>{
        if(window.innerWidth <= 960){ //Responsive button
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
      }, []);
    

    window.addEventListener("resize",showButton); //Listen to the change of size

  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    Ambience<span className="nav-second-color">HUB</span> <i class="fas fa-headphones-alt nav-icon"></i>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"}/>
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/blog" className='nav-links' onClick={closeMobileMenu}>
                            Blog
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/videos-main" className='nav-links' onClick={closeMobileMenu}>
                            Videos
                        </Link>
                    </li>
                    <li className='nav-item'>
                    {
                        localStorage.getItem("userName") ?
                        (
                            <h1 className='nav-links-mobile' onClick={closeMobileMenu} style={{color:"white"}}>{`Welcome ${localStorage.getItem("userName")}`}</h1>
                        ):     
                        <Link to="/sign-in" className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign in
                        </Link>
                    }
                   
                    </li>
                </ul>
                {
                    button && 
                    (
                        localStorage.getItem("userName") ?
                        <h1 onClickCapture={()=>navigateTo("/profile")} style={{color:"white"}}>{`Welcome ${localStorage.getItem("userName")}`}</h1>
                        :
                        <Button navigateTo="/sign-in"  buttonStyle="btn--outline" buttonSize="">SIGN IN</Button>
                    )
                
                }
            </div>
        </nav>
    </>
  )
}

export default Navbar
