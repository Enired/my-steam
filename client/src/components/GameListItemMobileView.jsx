import { useState } from "react";
import banner from "../assets/steam-banner.png"
import { updateGameStatus } from "../helpers/gameStatusUpdater";

export const GameListItemMobileView = (props) => {

  const [gameStatus, setGameStatus] = useState(props.gameStatus)
  return (
    <tr className="game-list-mobile">
      <td>
        <table className="something">
          <tbody>
            <tr>
              <td className="game-list-table-data-item game-list-table-img" colSpan={2}><img src={props.gamePic} onError={event=>{event.target.src=banner}}/></td>
            </tr>
            <tr>
              <th className="game-list-table-header">Name:</th>
              <td className="game-list-table-data-item">{props.gameName}</td>
            </tr>
            <tr>
              <th className="game-list-table-header">Status:</th>
              <td className="game-list-table-data-item">

                <select 
                className="game-list-status-selector" 
                // name={`${props.gameName.replaceAll(' ', '-').toLowerCase()}-selector`} 
                // id={`${props.gameName.replaceAll(' ', '-').toLowerCase()}-selector`} 
                value={gameStatus} 
                onChange={(event=>{setGameStatus(event.target.value); updateGameStatus(props.gameListItemId, event.target.value)})}
                >
                  <option>{gameStatus}</option>
                  <option value="Current">Current</option>
                  <option value="Completed">Completed</option>
                  {/* <option value="On Hold">On Hold</option> */}
                  <option value="Dropped">Dropped</option>
                  <option value="Planned">Planned</option>

                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>


  )
}