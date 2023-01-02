import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import  {firebaseApp}  from "../credentials";
import { useStore } from '../store/StoreProvider';
import { getVideos } from '../store/storeReducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SmallCard.css"
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';


function SmallCard(props) {
    const [favoritesVideos, setFavoritesVideos] = useState([])
    const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS
    const storeVideos = useStore();

    useEffect(() => {
      getFavorites();
    }, [])

    const getFavorites = ()=>{
      let favoritesId =  [];
      props.favorites.map((video)=> favoritesId.push(video.stringValue))
      let filteredVideos = storeVideos.filter((video)=>favoritesId.includes(video.id));
      setFavoritesVideos(filteredVideos);
    }
    
  return (
    <div className='swiper-container'>

    <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
      {favoritesVideos.map((video,index)=>
        (
          <SwiperSlide className='slide-container'>
            <Link key={index} className='small-card-container'>
            <div className='small-card-image-container'>
              <img className='small-card-image' src={video.picture}></img>     
            </div>
              <div className='small-card-information'>
                <h4>{video.name}</h4>
              </div>
          </Link>
         </SwiperSlide>
        ))}

      </Swiper>

    </div>
  )
}

export default SmallCard
