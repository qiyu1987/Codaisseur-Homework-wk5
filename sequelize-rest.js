const Sequelize = require('sequelize')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString)
// define model Movie
const Movie = sequelize.define('movie', {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis:Sequelize.STRING
});
// database update and seeding
sequelize.sync({force:true})
.then(
  () => {
    console.log('Database schema has been updated.')
    const movie1 = Movie.create({
      title: 'Momento',
      yearOfRelease: 2000,
      synopsis:'A guy with short memory loss is tracking someone who killed his wife' 
    })
    
    const movie2 = Movie.create({
      title: 'Stalker',
      yearOfRelease: 1979,
      synopsis:'A guide with two people is visiting THE ROOM, a place where wishes can be granted' 
    })
    
    const movie3 = Movie.create({
      title: 'MidSommar',
      yearOfRelease: 2019,
      synopsis:'Group of people travel to attend a folk festival turns out to be cultist' 
    })  
    return Promise.all([movie1,movie2,movie3])
  }
  )
  .then(
    () => console.log('3 movies initialized')
  )
  .catch(err => {
    console.error('DataBase Initialization Failed, shutting down...')
    process.exit(1)
  })
  // creat express app
  const express = require('express')
  const bodyParser = require('body-parser')
  const app = express()
  const port = process.env.PORT || 3000
  app.use(bodyParser.json())
  // create new movie resource
  app.post('/movies',
    (req, res, next) => {
      Movie.create(req.body)
        .then(movie => res.json(movie))
        .catch(next)
    } 
  )
  // read all movies -- collections
  app.get('/movies',
    (req, res, next) => {
      Movie.findAll()
        .then( 
          movies => res.json(movies)
        )
        .catch(next)
    }
  )
  // read a single movie by id
  app.get('/movies/:id', 
    (req, res, next) => {
      Movie.findByPk(req.params.id)
        .then(movie => {
          if(movie) {
            res.json(movie)
          } else {
            res.status(404).end()
          }
        })
        .catch(next)
    }
  )
  // update a single movie
  app.put('/movies/:id',
    (req, res, next) => {
      Movie.findByPk(req.params.id)
        .then( movie => {
          if (movie) {
            movie.update(req.body)
              .then(movie => res.json(movie))
          } else {
            res.status(404).end()
          } 
        })
        .catch(next)
    }
  )
  // delete a single movie by id
  app.delete('/movies/:id',
    (req, res, next) => {
      Movie.destroy({
        where: {
          id: req.params.id
          }
        })
        .then(
          number => {
            if (number) {
              res.status(204).end()
            } else {
              res.status(404).end()
            }
          }
        )
        .catch(next)
    }
  )

  // start server
  app.listen(port, ()=>console.log(`Listening on port ${port}`))
  