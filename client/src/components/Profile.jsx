import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Profile.scss";



export const Profile = (props) => {

  // Fetching account info from player db
  // Will use a search bar to dynamically change what user is loaded but for the time being. It will be my own. Enired.

  const [player, setPlayer] = useState({});
  const [playerMeta, setPlayerMeta] = useState({});
  const [gamesCount, setGamesCount] = useState(0);

  useEffect(() => {
    const playerDBUrl = `https://playerdb.co/api/player/steam/${document.cookie}`; //Change this later.
    axios.get(playerDBUrl)
      .then((res) => {
        const player = res.data.data.player;
        setPlayer(player);
        setPlayerMeta(player.meta);
      })
      .then(() => {
        axios.get(`/steam/gamecount/`, { params: { playerId: document.cookie } })
          .then((res) => setGamesCount(res.data.gameCount));
      })
  }, []);


  const steamUsername = player.username;
  const avatar = player.avatar;
  const playerName = playerMeta.realname;
  const officialSteamProfile = playerMeta.profileurl;
  // const randomNumber = Math.floor(Math.random() * gamesCount); //Testing Atm

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
              {steamUsername}
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
          <img src={avatar} alt="" />
        </div>
      </div>

      <div className="official-steam-profile-link">
        <a href={officialSteamProfile} target="_blank" className="link">Official Steam Profile</a>
      </div>
      <div className="official-steam-profile-link see-all-games-link">
        <div onClick={() => { props.switchViewAll(); }} className="link">See All Games</div>
      </div>

      <div className="lists">

        <div className="games" id="games-current">
          Current Games
          <ul className="game-list">
            {(props.gamesList.current.slice(0, 5)).map((game) => {
              return <li key={game.game_id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesList.current.length > 0 ?
              <li className="game-list-item game-list-see-more" onClick={props.switchViewCurrent}>See More</li> :
              <li className="game-list-item game-list-no-games">No games</li>
            }
          </ul>
        </div>

        <div className="games" id="games-completed">
          Completed Games
          <ul className="game-list">
            {(props.gamesList.completed.slice(0, 5)).map((game) => {
              return <li key={game.game_id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesList.completed.length > 0 ?
              <li className="game-list-item game-list-see-more" onClick={props.switchViewCompleted}>See More</li> :
              <li className="game-list-item game-list-no-games">No games</li>
            }
          </ul>
        </div>

        <div className="games" id="games-dropped">
          Dropped Games
          <ul className="game-list">
            {(props.gamesList.dropped.slice(0, 5)).map((game) => {
              return <li key={game.game_id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesList.dropped.length > 0 ?
            <li className="game-list-item game-list-see-more" onClick={props.switchViewDropped}>See More</li>:             
            <li className="game-list-item game-list-no-games">No games</li>
            }
          </ul>
        </div>

        <div className="games" id="games-planning">
          Planned Games
          <ul className="game-list">
            {(props.gamesList.planned.slice(0, 5)).map((game) => {
              return <li key={game.game_id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesList.planned.length > 0 ?
            <li className="game-list-item game-list-see-more" onClick={props.switchViewPlanned}>See More</li>:              
            <li className="game-list-item game-list-no-games">No games</li>
            }
          </ul>
        </div>


      </div>
      
    </div>
  );




};