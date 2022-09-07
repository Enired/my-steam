import { useState } from "react";
import banner from "../assets/steam-banner.png"

export const GameListItemMobileView = (props) => {

  const [gameStatus, setGameStatus] = useState(props.gameStatus)
  return (
    <tr className="game-list-mobile">
      <td>
        <table className="something">
          <tbody>
            <tr>
              <td className="game-list-table-data-item game-list-table-img" colSpan={2}><img src={props.gamePic} alt={'Image Unavailable'} onError={event=>{event.target.src=banner}}/></td>
            </tr>
            <tr>
              <th className="game-list-table-header">Name:</th>
              <td className="game-list-table-data-item">{props.gameName}</td>
            </tr>
            <tr>
              <th className="game-list-table-header">Status:</th>
              <td className="game-list-table-data-item">{props.gameStatus}</td>
            </tr>
            <tr>
              <th className="game-list-table-header">Status:</th>
              <td className="game-list-table-data-item">

                <select 
                className="game-list-status-selector" 
                // name={`${props.gameName.replaceAll(' ', '-').toLowerCase()}-selector`} 
                // id={`${props.gameName.replaceAll(' ', '-').toLowerCase()}-selector`} 
                value={gameStatus} 
                onChange={(event=>{setGameStatus(event.target.value)})}
                >
                  <option>{gameStatus}</option>
                  <option value="In Progress">Current</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Dropped">Dropped</option>
                  <option value="Plan to Play">Plan to Play</option>

                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>


  )
}