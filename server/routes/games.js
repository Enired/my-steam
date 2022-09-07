var express = require('express');
var router = express.Router();
const pg = require('pg');
const dbConnectionString = process.env.ELEPHANT_DB_URL;

//Returning list of games in DB that are currently being played
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

//Returning list of games in DB that are completed.
router.get('/completed', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `SELECT * FROM "games" where status = 'completed';`, (err, result) => {
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
router.get('/dropped', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `SELECT * FROM "games" where status = 'dropped';`, (err, result) => {
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
router.get('/planned', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `SELECT * FROM "games" where status = 'planned';`, (err, result) => {
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
router.get('/all', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `SELECT * FROM "games";`, (err, result) => {
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


router.put('/:id/current', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  console.log(req.params.id)
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `UPDATE games SET status = 'current' where id= $1`,[req.params.id], (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result)
        client.end()
        res.status(200)
      }
    );

  })
})
router.put('/:id/completed', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  console.log(req.params.id)
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `UPDATE games SET status = 'completed' where id= $1`,[req.params.id], (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result)
        client.end()
        res.status(200)
      }
    );

  })
})

router.put('/:id/dropped', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  console.log(req.params.id)
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `UPDATE games SET status = 'dropped' where id= $1`,[req.params.id], (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result)
        client.end()
        res.status(200)
      }
    );

  })
})

router.put('/:id/planned', (req,res) => {
  const client = new pg.Client(dbConnectionString);
  console.log(req.params.id)
  client.connect((err)=>{
    if (err) {
      return console.error('couldn\'t connect to postgres', err);
    }

    client.query(
      `UPDATE games SET status = 'planned' where id= $1`,[req.params.id], (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result)
        client.end()
        res.status(200)
      }
    );

  })
})

module.exports = router;