export const GameListItemMobileView = (props) => {
  return (
    <tr>
      <td>
        <table>
          <tbody>
            <tr>
              <th className="game-list-table-header">Game Icon:</th>
              <td className="game-list-table-data-item"><img src={props.gamePic} alt="Game Icon" /></td>
            </tr>
            <tr>
              <th className="game-list-table-header">Game Name:</th>
              <td className="game-list-table-data-item">{props.gameName}</td>
            </tr>
            <tr>
              <th className="game-list-table-header">Game Status:</th>
              <td className="game-list-table-data-item">{props.gameStatus}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>


  )
}