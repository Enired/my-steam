import "../styles/GamePage.scss";

import { GameListItemMobileView } from "./GameListItemMobileView";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

export const GamePage = (props) => {

  const appid = 3830;
  const hash = `460b6471db7d83ee6943c1a87f7a9f2898634952`;
  const gameStatus = 'Plan to play';
  const gamesList = props.gamesListAll


  // const gamesList = [
  //   {
  //     gameName: 'Psychonauts',
  //     appid: 3830,
  //     hash: '460b6471db7d83ee6943c1a87f7a9f2898634952',
  //     gameStatus: 'Plan to play'

  //   },
  //   {
  //     gameName: 'Dead Space 2',
  //     appid: 47780,
  //     hash: '6393351676edc4fdc65937a599780818fd2f18b7',
  //     gameStatus: 'Plan to play'

  //   },
  //   {
  //     gameName: 'SpaceChem',
  //     appid: 92800,
  //     hash: '29b26fc0eb22ebbeeeed1e4658dcbc6b837279c7',
  //     gameStatus: 'Plan to play'

  //   },
  //   {
  //     gameName: 'SpaceChem',
  //     appid: 92800,
  //     hash: '29b26fc0eb22ebbeeeed1e4658dcbc6b837279c7',
  //     gameStatus: 'Plan to play'

  //   },
  //   {
  //     gameName: 'SpaceChem',
  //     appid: 92800,
  //     hash: '29b26fc0eb22ebbeeeed1e4658dcbc6b837279c7',
  //     gameStatus: 'Plan to play'

  //   },
  //   {
  //     gameName: 'SpaceChem',
  //     appid: 92800,
  //     hash: '29b26fc0eb22ebbeeeed1e4658dcbc6b837279c7',
  //     gameStatus: 'Plan to play'

  //   },

  // ];

  return (
    <div className="game-page">
      <table className="game-list">
        <tbody>
          {/* <tr className="game-list-table-headers">
          <th className="game-list-table-header">Game Pic</th>
          <th className="game-list-table-header">Game Name</th>
          <th className="game-list-table-header">Game Status</th>
        </tr> */}
          {gamesList.map(game => {
            return (<GameListItemMobileView
              key={game.appid}
              gamePic={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
              gameName={game.name}
              gameStatus={'game.status'}
            />
              // <tr className="game-list-table-data" key={game.appid}>
              //   <td className="game-list-table-data-item game-list-table-img"><img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.hash}.jpg`} alt="" /></td>
              //   <td className="game-list-table-data-item">{game.gameName}</td>
              //   <td className="game-list-table-data-item">{game.gameStatus}</td>
              // </tr>
            );
          })}
        </tbody>
      </table>
      <ArrowBackSharpIcon id="back-to-profile-button" onClick={()=>{props.switchView()}}></ArrowBackSharpIcon>
    </div>
  );
};