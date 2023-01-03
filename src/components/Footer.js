import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {Button} from "./Button"
import "./Footer.css"
import  {firebaseApp}  from "../credentials";

function Footer() {

  const [subscribed, setSubscribed] = useState(false);
  const buttonSubscribe = useRef()
  const auth = getAuth(firebaseApp);
  let images = ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png",
"https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
"https://www.adobe.com/es/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium",
"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/2048px-BMW_logo_%28gray%29.svg.png"]

  const toggleSubscription = ()=>{
    setSubscribed(true);
  }

  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>Join our newsletter to receive
        all the information</p>
        <p className='footer-subscription-text'>
            You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
            <form>
                <input type="email" name="email" placeholder="Your Email" className="footer-input"></input>
            </form>
            <Button buttonStyle="btn--outline" ref={buttonSubscribe} onClick={toggleSubscription} className="sub-btn"> {subscribed ? "Subscription submitted succesfully" : "Subscribe"} </Button>
        </div>
      </section> */}
      <div className='slider-footer'>
        <div className='slide-track'>
        <div className='slide'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png'
          height={"100px"} width={"250px"} alt="logo" ></img>
        </div>
        <div className='slide'>
          <img src='https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr'
          height={"100px"} width={"250px"} alt="logo" ></img>
        </div>
        <div className='slide'>
          <img src='https://www.adobe.com/es/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium'
          height={"100px"} width={"250px"} alt="logo" ></img>
        </div>
        <div className='slide'>
          <img src='https://cdn.logo.com/hotlink-ok/logo-social.png'
          height={"100px"} width={"250px"} alt="logo" ></img>
        </div>
        <div className='slide'>
          <img src='https://pub-static.fotor.com/assets/projects/pages/5367889ea0f04e499fe8ffea853e2e33/red-fire-football-club-eaf753c529e84e4d8bdf1042c1f18cdc.jpg'
          height={"100px"} width={"250px"} alt="logo" ></img>
        </div>
        <div className='slide'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png'
          height={"100px"} width={"250px"} alt="logo" ></img>
        </div>
        
          <div className='slide'>
            <img src='https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr'
            height={"100px"} width={"250px"} alt="logo" ></img>
          </div>
          <div className='slide'>
            <img src='https://www.adobe.com/es/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium'
            height={"100px"} width={"250px"} alt="logo" ></img>
          </div>
          <div className='slide'>
            <img src='https://cdn.logo.com/hotlink-ok/logo-social.png'
            height={"100px"} width={"250px"} alt="logo" ></img>
          </div>
          <div className='slide'>
            <img src='https://pub-static.fotor.com/assets/projects/pages/5367889ea0f04e499fe8ffea853e2e33/red-fire-football-club-eaf753c529e84e4d8bdf1042c1f18cdc.jpg'
            height={"100px"} width={"250px"} alt="logo" ></img>
          </div>
        </div>
      </div>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to="/" className='social-logo'>
            Ambience<span className="nav-second-color">HUB</span> <i class="fas fa-headphones-alt nav-icon"></i>
            </Link>
          </div>
          <small className='website-rights'> AmbienceHUB 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
