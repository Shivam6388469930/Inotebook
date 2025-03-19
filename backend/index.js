const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
const port = 4000
app.use(express.json())
app.use(cors())

//Avaiable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`inotebook listening at http://localhost:port ${port}`)
})