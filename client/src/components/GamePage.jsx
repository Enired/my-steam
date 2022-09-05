import "../styles/GamePage.scss"

export const GamePage = (props) => {

  const appid = 3830
  const hash = `460b6471db7d83ee6943c1a87f7a9f2898634952`
  const gameName = 'Psychonauts'
  const gameStatus = 'Plan to play'

  return (
    <div class="game-page">
      <table>
        <tr>
          <th>Game Pic</th>
          <th>Game Name</th>
          <th>Game Status</th>
        </tr>
        <tr>
          <td><img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`} alt="" /></td>
          <td>{gameName}</td>
          <td>{gameStatus}</td>
        
        </tr>
      </table>
    </div>
  )
}