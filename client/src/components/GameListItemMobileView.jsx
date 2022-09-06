export const GameListItemMobileView = (props) => {
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
          </tbody>
        </table>
      </td>
    </tr>


  )
}