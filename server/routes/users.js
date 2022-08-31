var express = require('express');
var router = express.Router();
const pg = require('pg')

const dbConnectionString = process.env.ELEPHANT_DB_URL



/* GET users listing. */
router.get('/', function(req, res, next) {
  const client = new pg.Client(dbConnectionString)
  client.connect((err)=>{
    if(err){
      return console.error('couldn\'t connect to postgres', err)
    }
    client.query('DROP TABLE IF EXISTS "users"; CREATE TABLE IF NOT EXISTS"users"(user_id serial PRIMARY KEY, name VARCHAR(50) )', (err, result)=>{
      if(err){
        return console.error('error running query', err)
      }
      console.log('donesies');
      client.end();
    })
  })

  res.send("Done")
});

module.exports = router;
