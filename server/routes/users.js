var express = require('express');
var router = express.Router();
const pg = require('pg');

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
    client.query(createUserQuery, [username, password, steamIdNumber])
      .then(() => {
        const createGameListQuery =
          `
          INSERT INTO "Game_Lists"(user_id) 
            SELECT user_id FROM "Users" WHERE username = $1;
          `;
        client.query(createGameListQuery, [username])
          .then(() => {
            client.end();
            res.send('New user added');
          })
          .catch(err => { console.log(err); res.status(400); res.send(err.code); client.end(); });
      })
      .catch(err => { console.log(err); res.status(400); res.send(err.code); client.end(); });

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
