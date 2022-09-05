import "../styles/GamePage.scss"

export const GamePage = (props) => {

  const appid = 3830
  const hash = `460b6471db7d83ee6943c1a87f7a9f2898634952`
  const gameName = 'Psychonauts'
  const gameStatus = 'Plan to play'

  return (
    <div class="game-page">
      <table className="game-list">
        <tr className="game-list-table-headers">
          <th className="game-list-table-header">Game Pic</th>
          <th className="game-list-table-header">Game Name</th>
          <th className="game-list-table-header">Game Status</th>
        </tr>
        <tr className="game-list-table-data">
          <td className="game-list-table-data-item game-list-table-img"><img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`} alt="" /></td>
          <td className="game-list-table-data-item">{gameName}</td>
          <td className="game-list-table-data-item">{gameStatus}</td>
        </tr>
        <tr className="game-list-table-data">
          <td className="game-list-table-data-item game-list-table-img"><img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`} alt="" /></td>
          <td className="game-list-table-data-item">{gameName}</td>
          <td className="game-list-table-data-item">{gameStatus}</td>
        </tr>
        <tr className="game-list-table-data">
          <td className="game-list-table-data-item game-list-table-img"><img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`} alt="" /></td>
          <td className="game-list-table-data-item">{gameName}</td>
          <td className="game-list-table-data-item">{gameStatus}</td>
        </tr>
      </table>
    </div>
  )
}