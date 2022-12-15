import React from "react";
import "../../App.css"
import HeroSection from "../HeroSection"
import Cards from "../Cards";
import Footer from "../Footer";
import { useStore } from "../../store/StoreProvider";
import Spinner from "../Spinner";

function Home(){
    return(
        <>
            <Spinner></Spinner>
            <HeroSection/>
            <Cards limit={3}></Cards>
            <Footer></Footer>
        </>
    );
}

export default Home;