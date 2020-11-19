require('dotenv').config
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

//Route Import
const characterRoutes = require('./routes/characters')
const comicRoutes = require('./routes/comics')
const searchRoutes = require('./routes/search')

//Initialize Routes
app.use(characterRoutes)
app.use(comicRoutes)
app.use(searchRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server Running')
})