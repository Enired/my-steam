import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Profile.scss";



export const Profile = () => {

  // Fetching account info from player db
  // Will use a search bar to dynamically change what user is loaded but for the time being. It will be my own. Enired.

  const [player, setPlayer] = useState({});
  const [playerMeta, setPlayerMeta] = useState({});

  const steamAPIKey = process.env.REACT_APP_STEAM_API_KEY;

  useEffect(() => {
    const playerDBUrl = 'https://playerdb.co/api/player/steam/enired'; //Change this later.
    axios.get(playerDBUrl)
      .then((res) => {
        const player = res.data.data.player;
        console.log(player.meta); // Kept for testing purposes. REMOVE AFTER
        setPlayer(player);
        setPlayerMeta(player.meta);
      });
    // const steamAPIURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=76561197960434622&format=json` 
    // axios.get(steamAPIURL)
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{console.log(err.message)})
  }, []);


  const username = player.username;
  const id = player.id;
  const avatar = player.avatar;
  const playerName = playerMeta.realname;
  const officialSteamProfile = playerMeta.profileurl;
  return (
    <div className="profile">
      <div>NAV BAR HERE AND WILL BE REPLACED</div>
      <div className="user-info">
        <div>
        <div className="profile-names">
          <div className="persona-name">
            {username}
          </div>
          {playerName && 
            <div className="real-name">
              {playerName}
            </div>
          }
          <br/>
          <div className="game-count">
            Games: {549}
          </div>
        </div>
        </div>

        <div className="profile-avatar">
          <img src={avatar} alt="steam-profile-picture" />
        </div>
      </div>

      <div className="official-steam-profile-link">
        <a href={officialSteamProfile} className="link">Official Steam Profile</a>
      </div>

      <div className="lists">
        <div className="games" id="games-current">
          Current Games
          <ul className="game-list">
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
          </ul>
        </div>

        <div className="games" id="games-completed">
          Completed Games
          <ul className="game-list">
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
          </ul>
        </div>

        <div className="games" id="games-dropped">
          Dropped Games
          <ul className="game-list">
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
          </ul>
        </div>

        <div className="games" id="games-planning">
          Planned Games
          <ul className="game-list">
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
            <li className="game-list-item">test</li>
          </ul>
        </div>


      </div>
    </div>
  );




};