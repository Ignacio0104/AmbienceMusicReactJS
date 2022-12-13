import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import "./Navbar.css";

function Navbar() {

    const [click, setClick] = useState(false);

    const [button, setButton] = useState(true)

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
                    TRVL <i className='fab fa-typo3'></i>
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
                        <Link to="/sign-up" className='nav-links-mobile' onClick={closeMobileMenu}>
                            Sign up
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle="btn--outline" buttonSize="">SIGN UP</Button>}
            </div>
        </nav>
    </>
  )
}

export default Navbar
