import React from "react";
import "../../App.css"
import HeroSection from "../HeroSection"
import Cards from "../Cards";
import Footer from "../Footer";

function Home(){
    console.log("Aca estoy")
    return(
        <>
            <HeroSection/>
            <Cards></Cards>
            <Footer></Footer>
        </>
    );
}

export default Home;