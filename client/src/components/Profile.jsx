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
      });
  }, []);


  const steamUsername = player.username;
  const avatar = player.avatar;
  const playerName = playerMeta.realname;
  const officialSteamProfile = playerMeta.profileurl;
  const gameLists = Object.keys(props.gamesList);
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
        <a href={officialSteamProfile} target="_blank" rel="noreferrer" className="link">Official Steam Profile</a>
      </div>
      <div className="official-steam-profile-link see-all-games-link">
        <div onClick={() => { props.gamesList['all'].switchView(); }} className="link">See All Games</div>
      </div>

      <div className="lists">
        {gameLists.slice(1).map(key => <div className="games" id={`games-${key}`} key={key}>
          {`${key[0].toUpperCase()}${key.slice(1)} Games`}
          <ul className="game-list">
            {(props.gamesList[key].list.slice(0, 5)).map((game) => {
              return <li key={game.game_list_item_id} className="game-list-item">{game.game_name}</li>;
            })}
            {props.gamesList[key].list.length > 0 ?
              <li className="game-list-item game-list-see-more" key={`see-more-games-in-${key}-list`} onClick={()=>props.gamesList[key].switchView()}>See More</li> :
              <li className="game-list-item game-list-no-games" key={`no-games-in-${key}-list`}>No games</li>
            }
          </ul>
        </div>)}
      </div>

    </div>
  );




};