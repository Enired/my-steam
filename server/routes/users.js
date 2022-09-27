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

//Creating a new user in the table
router.post('/new', (req, res, next)=>{
  const client = new pg.Client(dbConnectionString);
  // client.connect((err) => {
  //   if(err){
  //     return console.error('couldn\'t connect to postgres', err);
  //   }
  //   const newUserQuery = `INSERT INTO "users" (username, password, steam_id_number) VALUES ($1, $2, $3);`
  //   client.query(newUserQuery, [username])
  // })
  console.log('req',req)
  console.log('res',res)

})



module.exports = router;
