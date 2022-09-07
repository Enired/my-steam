import { useSlotProps } from "@mui/base";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Profile.scss";



export const Profile = (props) => {

  // Fetching account info from player db
  // Will use a search bar to dynamically change what user is loaded but for the time being. It will be my own. Enired.

  const [player, setPlayer] = useState({});
  const [playerMeta, setPlayerMeta] = useState({});
  const [gamesCount, setGamesCount] = useState(0);
  const [gamesList, setGamesList] = useState([]);


  const steamAPIKey = process.env.REACT_APP_STEAM_API_KEY;

  useEffect(() => {
    const playerDBUrl = 'https://playerdb.co/api/player/steam/enired'; //Change this later.
    axios.get(playerDBUrl)
      .then((res) => {
        const player = res.data.data.player;
        setPlayer(player);
        document.cookie = player.id;
        setPlayerMeta(player.meta);
      })
      .then(() => {
        axios.get(`/steam/gamecount/`, { params: { playerId: document.cookie } })
          .then((res) => setGamesCount(res.data.gameCount));
      })
      .then(() => {
        axios.get('/steam/games/', { params: { playerId: document.cookie } })
          .then((res) => { setGamesList(res.data.games.games); });
      });




  }, []);


  const username = player.username;
  const id = player.id;
  const avatar = player.avatar;
  const playerName = playerMeta.realname;
  const officialSteamProfile = playerMeta.profileurl;
  const randomNumber = Math.floor(Math.random() * gamesCount); //Testing Atm

  //////////////////////////////////
  // For the game List            //
  // Don't remove the randomizer. // 
  // Testing purpose only.        //
  //////////////////////////////////
  return (
    <div className="profile">
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
            <br />
            <div className="game-count">
              Games: {gamesCount}
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
      <div className="official-steam-profile-link">
        <a onClick={() => { props.switchViewAll(); }} className="link">See All Games</a>
      </div>

      <div className="lists">
        <div className="games" id="games-current">
          Current Games
          <ul className="game-list">
            {(props.gamesListCurrent).map((game) => {
              return <li key={game.id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesListCurrent.length > 0 ?
              <li className="game-list-item game-list-see-more" onClick={props.switchViewCurrent}>See More</li> :
              <li className="game-list-item game-list-see-more">No games</li>
            }
          </ul>
        </div>

        <div className="games" id="games-completed">
          Completed Games
          <ul className="game-list">
            {(props.gamesListCompleted.slice(0, 5)).map((game) => {
              return <li key={game.id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesListCompleted.length > 0 ?
              <li className="game-list-item game-list-see-more" onClick={props.switchViewCompleted}>See More</li> :
              <li className="game-list-item game-list-see-more">No games</li>
            }
          </ul>
        </div>

        <div className="games" id="games-dropped">
          Dropped Games
          <ul className="game-list">
            {(props.gamesListDropped.slice(0, 5)).map((game) => {
              return <li key={game.id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesListDropped.length > 0 ?
            <li className="game-list-item game-list-see-more" onClick={props.switchViewDropped}>See More</li>:              <li className="game-list-item game-list-see-more">No games</li>
            }
          </ul>
        </div>

        <div className="games" id="games-planning">
          Planned Games
          <ul className="game-list">
            {(props.gamesListPlanned.slice(0, 5)).map((game) => {
              return <li key={game.id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesListPlanned.length > 0 ?
            <li className="game-list-item game-list-see-more" onClick={props.switchViewPlanned}>See More</li>:              <li className="game-list-item game-list-see-more">No games</li>
            }
          </ul>
        </div>


      </div>
    </div>
  );




};