import React from "react";
import "../../App.css"
import HeroSection from "../HeroSection"
import Cards from "../Cards";
import Footer from "../Footer";
import { useStore } from "../../store/StoreProvider";

function Home(){
    return(
        <>
            <HeroSection/>
            <Cards limit={3}></Cards>
            <Footer></Footer>
        </>
    );
}

export default Home;