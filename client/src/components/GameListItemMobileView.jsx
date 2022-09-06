import { useState } from "react";

export const GameListItemMobileView = (props) => {

  const [gameStatus, setGameStatus] = useState(props.gameStatus)
  return (
    <tr className="game-list-mobile">
      <td>
        <table id="something">
          <tbody>
            <tr>
              <td className="game-list-table-data-item game-list-table-img" colSpan={2}><img src={props.gamePic} alt="Game Icon" /></td>
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
              <td className="game-list-table-data-item"><select name={`${props.gameName}-selector`} id={`${props.gameName}-selector`} value={gameStatus} onChange={(event=>{setGameStatus(event.target.value)})}>
                <option>{gameStatus}</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Dropped">Dropped</option>
                <option value="Plan to Play">Plan to Play</option>
                </select></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>


  )
}