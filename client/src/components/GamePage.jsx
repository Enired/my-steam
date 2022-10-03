import "../styles/GamePage.scss";

import { GameListItemMobileView } from "./GameListItemMobileView";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useState } from "react";
import { useEffect } from "react";

export const GamePage = (props) => {

  const gamesList = props.gamesList
  const [currentPage, setCurrentPage] = useState(1)
  const firstItem = (currentPage-1)*10
  const lastItem = currentPage*10

  //Capitalize the first letter of the game status.
  const capStatus = (str) => {
    return `${str.substring(0,1).toUpperCase()}${str.substring(1).toLowerCase()}`
  } 

  const back = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0,0)
  }
  
  const forward = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0,0)
  }

  useEffect(()=>{},[currentPage])
  return (
    <div className="game-page">
      <table className="game-list">
        <tbody>
          {gamesList.slice(firstItem, lastItem).map(game => {
    
              return (<GameListItemMobileView
                key={game.game_list_item_id}
                gameListItemId={game.game_list_item_id}
                gamePic={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steam_app_id}/header.jpg`}
                gameName={game.game_name}
                gameStatus={capStatus(game.game_status)}
              />
              );
            
          })}
        </tbody>
      </table>
      <div className="pagination-buttons">
      {currentPage > 1 && <ArrowBackIosNewSharpIcon className="pagination-navigation" onClick={()=>back()}>BACK</ArrowBackIosNewSharpIcon>}
      {(gamesList.length > 10 && lastItem < gamesList.length) && <ArrowForwardIosSharpIcon className="pagination-navigation" onClick={()=>forward()}/>}
      </div>
      <ArrowBackSharpIcon id="back-to-profile-button"  onClick={()=>{props.switchView()}}></ArrowBackSharpIcon>
    </div>
  );
};