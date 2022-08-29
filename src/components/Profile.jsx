import axios from "axios"
import { useEffect } from "react";

export const Profile = () => {

  // Fetching account info from player db
  // Will use a search bar to dynamically change what user is loaded but for the time being. It will be my own. Enired.

  useEffect(()=>{
    const playerDBUrl = 'https://playerdb.co/api/player/steam/enired' //Change this later.
    axios.get(playerDBUrl)
    .then((data)=>{console.log(data)})
  },[])
  
  return(
    <div>
      
    </div>
  )




}