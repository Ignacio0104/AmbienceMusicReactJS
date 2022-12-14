import { type } from "@testing-library/user-event/dist/type"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import  {firebaseApp}  from "../credentials";
const db = getFirestore(firebaseApp); //ADD A BASE DE DATOS

const types = {
    ADD: "ADD",
    UPDATE_ALL : "UPDATE_ALL",
    DELETE : "DELETE",
    INCREASE_VIEWS: "INCREASE_VIEWS",
    UPDATE:"UPDATE"
}

const initialStore = [{
    /*id:1,
    name:"Cozy Jazz Music at Snow Christmas Night", 
    url:"https://www.youtube.com/embed/qFbY87Gm7dI",
    theme: ["jazz","christmas","winter"],
    picture: "https://i.ytimg.com/vi/qFbY87Gm7dI/maxresdefault.jpg?v=6395b513",
    description: "On cold snow nights, what could be better than sitting somewhere in the middle of the noisy city, sipping your favorite drink and watching the space darken in a corner of this cozy room, on a christmas night. The relaxing and smooth melodies of Piano Jazz are enough for those who sit here to feel like they can drop their souls into that wonderful space. A truly meaningful relaxation time before the end of a long day. Take time for yourself, enjoy the peace of life through delicious cups of coffee and some soft jazz music.",
    views:0
},{
    id:2,
    name:"Hogwarts Great Hall | Harry Potter Music & Ambience", 
    url:"https://www.youtube.com/embed/_v4cgUVBsi4",
    theme: ["movies","christmas","harry","potter"],
    picture: "https://i.ytimg.com/vi/_v4cgUVBsi4/maxresdefault.jpg",
    description: "Immerse yourself in the legendary Great Hall of Hogwarts School of Witchcraft and Wizardry! Think about all of the memories you would make here as a student. The sorting ceremony, holiday meals, speeches from the headmaster, and more! Relax and enjoy this 3 hour video.",
    views:0
},{
    id:3,
    name:"Coding Session - Lofi Hip Hop Mix [ Coding Lofi Mix | Coding Music ]", 
    url:"https://www.youtube.com/embed/qZjWUkohSQg",
    theme: ["LoFi","relax","coding","Hip Hop"],
    picture: "https://i.ytimg.com/vi/qZjWUkohSQg/maxresdefault.jpg",
    description: "Welcome to Lofi Boost Your Mood Thank you all for watching and enjoying this Coding Lofi Mix Wish you happy listening",
    views:0
},{
    id:4,
    name:"Lord of the Rings | The Shire - Music & Ambience", 
    url:"https://www.youtube.com/embed/30b7_S0paCQ",
    theme: ["movies","relax","shire","LOTR","rings","Lord of the rings"],
    picture: "https://i.ytimg.com/vi/30b7_S0paCQ/maxresdefault.jpg",
    description: "I want to see the wild country again before I die, and the Mountains; but he is still in love with the Shire, with woods and fields and little rivers.",
    views:0
},{
    id:5,
    name:"Beach Cafe Ambience: tropical music, ocean waves, & no worries!", 
    url:"https://www.youtube.com/embed/oFRFaI0Ntvk",
    theme: ["tropical","beach","ocean","cafe"],
    picture: "https://i.ytimg.com/vi/oFRFaI0Ntvk/maxresdefault.jpg",
    description: "Enjoy the relaxing atmosphere of this tropical beach cafe ambience with instrumental beach music, softly crashing waves, birds, and soft chatter in the background. Grab your favorite book and a cup of coffee and take a seat near the water to watch the waves gently rolling on shore. The playlist I created for this cafe ambience is a mix of relaxing Hawaiian, acoustic guitar, ukulele, island, and reggae music. Hope you enjoy your beach day vacation!",
    views:0
*/}]

const nextId = () => initialStore.reduce(function(prev, current) {
    return (prev.y > current.y) ? prev : current
})


const getVideos= async()=>{
    try{
        const querySnapshot = await getDocs(collection(db,"videos"));
        const registers = [];
        querySnapshot.forEach((doc)=>{
            registers.push({...doc.data(), id:doc.id})
        })
        return registers;
    }catch(err){
        console.log(err)
        return [{}];
    }
}


const storeReducer = (state, action) => { 
    switch(action.type) {
        case types.ADD:
            return [
                ...state,
                {
                    id: nextId(),
                    name: action.payload.name,
                    url: action.payload.url,
                    theme: action.payload.theme,
                    picture: action.payload.picture,
                    description: action.payload.description
                }
            ]
        case types.UPDATE_ALL:
            state= action.payload.list;
            return state;
        case types.DELETE:
            return state.filter((video)=>video.id!==action.payload.id);
        case types.INCREASE_VIEWS:
            return state.map((video)=>
            (video.id===action.payload.id)
            ?
            {
                ...video,
                views: video.views++
            }:
            video)
        case types.UPDATE:
            return state.map((video)=>
            (video.id===action.payload.id)
            ?
            {
                ...video,
                name: action.payload.name,
                url: action.payload.url,
                theme: action.payload.theme,
                picture: action.payload.picture,
                description: action.payload.description
            }:
            video)
        default:
            return state;
    }
}

export { initialStore, types, getVideos };
export default storeReducer;