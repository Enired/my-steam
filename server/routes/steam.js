var express = require('express');
var router = express.Router();
const axios = require('axios');
const steamAPIKey = process.env.STEAM_API_KEY;
const pg = require('pg');
const dbConnectionString = process.env.ELEPHANT_DB_URL;

router.get('/gamecount', function (req, res, next) {
  let gameCount;
  console.log('hello', req.query.playerId);
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json`)
    .then((res) => { gameCount = res.data.response.game_count; })
    .then(() => res.json({ gameCount }))
    .catch(() => { });

});
router.get('/games', function (req, res, next) {
  let gameCount;
  console.log('goodbye', req.query.playerId);
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json&include_appinfo=true`)
    .then((res) => { const gamesList = { games: res.data.response.games }; return gamesList; })
    .then(games => res.json({ games }))

    .catch(() => { });

});

router.get('/test', function (req, res, next) {
  let gameCount;
  // console.log('goodbye',req.query.playerId)

  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=76561198008227465&format=json&include_appinfo=true`)
    //res.data.response.games is an array
    .then((res) => {
      const client = new pg.Client(dbConnectionString);
      client.connect((err) => {
        if (err) {
          return console.error('couldn\'t connect to postgres', err);
        }

        client.query(
          `DROP TABLE IF EXISTS "games"; CREATE TABLE IF NOT EXISTS "games" (game_id serial PRIMARY KEY, game_name VARCHAR(500));`, (err, result) => {
            if (err) {
              return console.error('error running query', err);
            }
            
          });
        res.data.response.games.forEach(
          (game) => {
            client.query(
              `INSERT INTO "games"(game_name) VALUES ($1);`, [game.name], (err, result) => {
                if (err) {
                  return console.error('error running query', err);
                }
              });
            // console.log(game.name)
          }
        );
      });

      return client;
    })
    .then((client) => { client.end; console.log('DB Update Complete')})
    .then(() => { res.send('TEST'); })

    .catch(() => { });

});

module.exports = router;
