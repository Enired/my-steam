var express = require('express');
var router = express.Router();
const axios = require('axios')
const steamAPIKey = process.env.STEAM_API_KEY
router.get('/gamecount', function(req, res, next) {
  let gameCount;
  console.log('hello',req.query.playerId)
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json`)
  .then((res)=>{gameCount=res.data.response.game_count})
  .then(()=>res.json({gameCount}))
  .catch(()=>{})

});
router.get('/games', function(req, res, next) {
  let gameCount;
  console.log('goodbye',req.query.playerId)
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json&include_appinfo=true`)
  .then((res)=>{const gamesList = {games:res.data.response.games}; return gamesList})
  .then(games=>res.json({games}))

  .catch(()=>{})

});

module.exports = router;
