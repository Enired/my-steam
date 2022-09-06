var express = require('express');
var router = express.Router();
const pg = require('pg');
const dbConnectionString = process.env.ELEPHANT_DB_URL;


router.get('/current', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `SELECT * FROM "games" where status = 'current';`, (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result)
        res.json(result.rows)
        client.end()

      }
    );

  })
})

module.exports = router;