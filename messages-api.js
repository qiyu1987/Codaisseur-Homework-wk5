const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors')
const corsMiddleware = cors()
const app = express()
const port = 3000
let count = 0
const validationMiddleware = (req, res, next) => {
    if (!req.body.text||req.body.text===''){
        res.status(400).end()
    }
    if (count > 4) {
        res.status(429).end()
    }
    count = count + 1
    next()
}
app.use(corsMiddleware)
app.use(jsonParser)
app.use(validationMiddleware)
app.post('/messages', 
    (req, res, next) => {

        console.log(req.body.text)
        
        res.json({
            message: 'Message received loud and clear'
        })
        
    }
)
app.listen(port, console.log(`Listening on port ${port}`))