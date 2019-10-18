const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const app = express()
const port = 3000
app.use(corsMiddleware)
app.use(jsonParser)
app.post('/messages', 
    (req, res, next) => {
        console.log(req.body.text)
        res.json({
            message: 'Message received loud and clear'
        })
    }
)
app.listen(port, console.log(`Listening on port ${port}`))