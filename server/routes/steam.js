var express = require('express');
var router = express.Router();
const axios = require('axios');
const steamAPIKey = process.env.STEAM_API_KEY;
const pg = require('pg');
const dbConnectionString = process.env.ELEPHANT_DB_URL;

router.get('/gamecount', function (req, res, next) {
  let gameCount;
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json`)
    .then((res) => { gameCount = res.data.response.game_count; })
    .then(() => res.json({ gameCount }))
    .catch(() => { });

});
router.get('/games', (req, res) => {
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json&include_appinfo=true`)
    .then((res) => { const gamesList = { games: res.data.response.games }; return gamesList; })
    .then(games => res.json({ games }))

    .catch(() => { });

});

router.get('/import-steam-list', (req, res, next) => {
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=76561198008227465&format=json&include_appinfo=true`)
    .then((res) => {
      const client = new pg.Client(dbConnectionString);
      client.connect((err) => {
        if (err) {
          return console.error('couldn\'t connect to postgres', err);
        }

        client.query(
          `DROP TABLE IF EXISTS "games"; CREATE TABLE IF NOT EXISTS "games" (game_id serial PRIMARY KEY, game_name VARCHAR(500), status VARCHAR(200) DEFAULT('Plan to Play'));`, (err) => {
            if (err) {
              return console.error('error running query', err);
            }
          }
        );

        // Counter for games data 
        let counter = 0;
        // For each game pulled from the user's account. Add it to the database with the plan to play status. Used for signup.  
        res.data.response.games.forEach(
          (game, _, array) => {
            client.query(
              `INSERT INTO "games"(game_name) VALUES ($1);`, [game.name], (err) => {
                if (err) {
                  return console.error('error running query', err);
                }
                counter++;
                if (counter === array.length) {
                  console.log('DB Update Complete');
                  client.end();
                }
              }
            );
          }
        );
      });

      return;
    })
    .then(() => { res.send('Steam List Imported'); })

    .catch(() => { });

});

module.exports = router;
