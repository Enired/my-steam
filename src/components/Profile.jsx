import axios from "axios"
import { useEffect, useState } from "react";

export const Profile = () => {

  // Fetching account info from player db
  // Will use a search bar to dynamically change what user is loaded but for the time being. It will be my own. Enired.

  const [player, setPlayer] = useState({})

  useEffect(()=>{
    const playerDBUrl = 'https://playerdb.co/api/player/steam/enired' //Change this later.
    axios.get(playerDBUrl)
    .then((res)=>{
      const player = res.data.data.player
      setPlayer(player)
      })
  },[])
  
  return(
    <div>
      {player.username}
    </div>
  )




}