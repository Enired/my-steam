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

module.exports = router;
