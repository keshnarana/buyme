const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const postCharge = require('./my-app/src/stripe').default
require('dotenv').config()

const app = express()
const router = express.Router()
const port = process.env.PORT || 7000

router.post('/stripe/charge', postCharge)
router.all('*', (_, res) =>
  res.json({ message: 'please make a POST request to /stripe/charge' })
)

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json())
app.use('/api', router)
app.use(express.static(path.join(__dirname, './my-app/build')))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, './my-app/build/index.html'))
})

app.listen(port, () => console.log(`server running on port ${port}`))
