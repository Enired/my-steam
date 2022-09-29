var express = require('express');
var router = express.Router();
const axios = require('axios');
const steamAPIKey = process.env.STEAM_API_KEY;
const pg = require('pg');
const dbConnectionString = process.env.ELEPHANT_DB_URL;

//Returns number of games owned by user.
router.get('/gamecount', function (req, res, next) {
  let gameCount;
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json`)
    .then((res) => { gameCount = res.data.response.game_count; })
    .then(() => res.json({ gameCount }))
    //Empty catch code block so server doens't crash. Will implement handling later
    .catch(() => { });

});

//Getting list of games. Was used for testing to connect to steamAPI not sure if needed anymore.
router.get('/games', (req, res) => {
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.query.playerId}&format=json&include_appinfo=true`)
    .then((res) => { const gamesList = { games: res.data.response.games }; return gamesList; })
    .then(games => res.json({ games }))
    //Empty catch code block so server doens't crash. Will implement handling later
    .catch(() => { });

});
// Import user's game list for sign up. Any games bought after sign up will have to be manually added.
// Currently fixed to one user. Change to take userID arguement
// userID arguement will correspond to database user.id. Use that to attach games to user.  
router.post('/import-steam-list/:steamIdNumber', (req, res, next) => {
  axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${req.params.steamIdNumber}&format=json&include_appinfo=true`)
    .then((res) => {
      const client = new pg.Client(dbConnectionString);
      client.connect((err) => {
        if (err) {
          return console.error('couldn\'t connect to postgres', err);
        }

        // client.query(
        //   `DROP TABLE IF EXISTS "games"; CREATE TABLE IF NOT EXISTS "games" (id INT, game_name VARCHAR(500), status VARCHAR(200) DEFAULT('Planned'));`, (err) => {
        //     if (err) {
        //       return console.error('error running query', err);
        //     }
        //   }
        // );

        // Counter for games data 
        let counter = 0;
        // For each game pulled from the user's account. Add it to the database with the plan to play status. Used for signup.  
        res.data.response.games.forEach(
          (game, _, array) => {
            client.query(
              `INSERT INTO "Games"(steam_app_id, game_name) 
                SELECT $1, $2
              WHERE NOT EXISTS (
                SELECT 1 FROM "Games" WHERE steam_app_id = $1);`
                , 
              [game.appid, game.name], (err) => {
              if (err) {
                return console.error('error running query', err);
              }
              counter++;
              if (counter === array.length) {
                console.log('Steam List Imported.');
                client.end();
              }
            }
            );
          }
        );
      });

      // console.log(req.params.steamIdNumber)

      return;
    })
    .then(() => { res.send('Steam List Importing...'); })
    //Empty catch code block so server doens't crash. Will implement handling later
    .catch(() => { });

});

module.exports = router;
