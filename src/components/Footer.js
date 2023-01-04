import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {Button} from "./Button"
import "./Footer.css"
import  {firebaseApp}  from "../credentials";

function Footer() {

  const auth = getAuth(firebaseApp);
  let images = ["./images/LogoSlider/Youtube.png",
  "./images/LogoSlider/AppleLogo.png",
  "./images/LogoSlider/DisneyLogo.png",
  "./images/LogoSlider/ambientWorldsLogo.png",
  "./images/LogoSlider/globant-logo.png",
  "./images/LogoSlider/logo-Samsung.png",
  "./images/LogoSlider/calmedLogo.png",
  "./images/LogoSlider/logo-Sony.png",
  "./images/LogoSlider/NBA-Logo.png",
  "./images/LogoSlider/relaxJazzLogo.png"]

  return (
    <div className='footer-container'>
    <h2 className='footer-title'>Meet our sponsors</h2>
      <div className='slider-footer'>
        <div className='slide-track'>
        {images.map((image,index)=> (
          <div className='slide'>
          <img src={image}
          key={index}
          alt="logo" ></img>
        </div>
        ))}
        {images.map((image,index)=>(
          <div className='slide'>
          <img src={image}
          key={index}
          alt="logo" ></img>
        </div>
        ))}
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
