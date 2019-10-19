const Sequelize = require('sequelize')
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString)
// define model Movie
const Movie = sequelize.define('movie', {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis:Sequelize.STRING
});
sequelize.sync()
.then(
  () => {
    Movie.create({
      title: 'Momento',
      yearOfRelease: 2000,
      synopsis:'A guy with short memory loss is tracking someone who killed his wife' 
    })
    
    Movie.create({
      title: 'Stalker',
      yearOfRelease: 1979,
      synopsis:'A guide with two people is visiting THE ROOM, a place where wishes can be granted' 
    })
    
    Movie.create({
      title: 'MidSommar',
      yearOfRelease: 2019,
      synopsis:'Group of people travel to attend a folk festival turns out to be cultist' 
    })  
  }
  )
  // creat express app
  const express = require('express')
  const app = express()
  