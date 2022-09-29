var express = require('express');
var router = express.Router();
const pg = require('pg');
const axios = require('axios');
const steamAPIKey = process.env.STEAM_API_KEY;

const dbConnectionString = process.env.ELEPHANT_DB_URL;



/* GET users listing. */
// router.get('/', function (req, res, next) {
//   const client = new pg.Client(dbConnectionString);
//   client.connect((err) => {
//     if (err) {
//       return console.error('couldn\'t connect to postgres', err);
//     }
//     client.query('DROP TABLE IF EXISTS "users"; CREATE TABLE IF NOT EXISTS "users" ( user_id serial PRIMARY KEY, name VARCHAR(50) )', (err, result) => {
//       if (err) {
//         return console.error('error running query', err);
//       }
//       console.log('donesies');
//       client.end();
//     });
//   });

//   res.send("Done");
// });

//Creating a new user in the table //WORKS 
router.post('/new', (req, res, next) => {
  const userInfo = req.body;
  const username = userInfo.username;
  const password = userInfo.password;
  const steamIdNumber = userInfo.steamIdNumber;
  const client = new pg.Client(dbConnectionString);
  client.connect((err) => {
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }
    const createUserQuery =
      `
      INSERT INTO "Users" (username, password, steam_id_number) 
        SELECT $1, $2, $3; 
      `;

    // Create the user
    client.query(createUserQuery, [username, password, steamIdNumber])
      .then(() => {
        const createGameListQuery =
          `
          INSERT INTO "Game_Lists"(user_id) 
          SELECT user_id FROM "Users" WHERE username = $1;
          `;
        //Create the list
        client.query(createGameListQuery, [username])
          .then(() => {
            // client.end();
           
          })
          .catch(err => {
            console.log(err); res.status(400); res.send(err.code); client.end();
          });
      })
      //TEST TEST
      .then(() => {
        axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamAPIKey}&steamid=${steamIdNumber}&format=json&include_appinfo=true`)
          .then((ownedGames) => {
              // Counter for games data 
              let counter = 0;
              // For each game pulled from the user's account. Add it to the database with the plan to play status. Used for signup.  
              ownedGames.data.response.games.forEach(
                (game, _, array) => {
                  client.query(
                    `
                    INSERT INTO "Games"(steam_app_id, game_name) 
                    SELECT $1, $2
                    WHERE NOT EXISTS 
                      (SELECT 1 FROM "Games" WHERE steam_app_id = $1);
                    `
                    ,
                    [game.appid, game.name]

                  )
                    .then(() => {
                      client.query(
                        `INSERT INTO "Game_List_Items"(list_id, game_id) 
                        Select (Select game_list_id from "Game_Lists" where user_id = (SELECT user_id FROM "Users" WHERE username = $1)) , (Select game_id from "Games" where steam_app_id = $2)
                        WHERE NOT EXISTS (
                        SELECT 1 FROM "Game_List_Items" WHERE game_id=(Select game_id from "Games" where steam_app_id = $2) AND list_id = (Select game_list_id from "Game_Lists" where user_id = (SELECT user_id FROM "Users" WHERE username = $1)));`
                        ,
                        [username, game.appid], (err) => {
                          if (err) {
                            return console.error('error running query', err);
                          }
                          counter++;
                          if (counter === array.length) {
                            console.log('Steam List Imported.');
                            client.end();
                            res.send('New user added');
                          }
                        });
                    });
                }
              );
            

            return;
            // console.log(req.params.steamIdNumber)

          });
      })



      .catch(err => {
        console.log(err); res.status(400); res.send(err.code); client.end();

      });

  });






});

//Fetching User Information based on username.
router.get('/:username', (req, res) => {
  const username = req.params.username;
  const client = new pg.Client(dbConnectionString);
  client.connect((err) => {
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }
    const query = `SELECT * FROM "Users" WHERE username = $1;`;
    client.query(query, [username], (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }

      res.json(result.rows);
      client.end();
    });
  });
  // res.status(200)
  // res.send()
});



module.exports = router;
