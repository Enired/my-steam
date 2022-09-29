import "../styles/GamePage.scss";

import { GameListItemMobileView } from "./GameListItemMobileView";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

export const GamePage = (props) => {

  const gamesList = props.gamesList

  //Capitalize the first letter of the game status.
  const capStatus = (str) => {
    return `${str.substring(0,1).toUpperCase()}${str.substring(1).toLowerCase()}`
  } 

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
                key={game.game_list_item_id}
                gameListItemId={game.game_list_item_id}
                gamePic={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steam_app_id}/header.jpg`}
                gameName={game.game_name}
                gameStatus={capStatus(game.game_status)}
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