const package = require('./package.json')
const express = require('express')
const bodyParser = require('body-parser')
const formData = require('express-form-data')
const env = require('./env.js')
const app = express()
const cors = require('cors')

const cliente = require('./routes/cliente.js')
const fornecedor = require('./routes/fornecedor.js')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(formData.parse())
app.use(bodyParser.json())

corsOpt = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOpt))

app.use('/', cliente)
app.use('/', fornecedor)
app.use('/images/', express.static('uploads'))

app.get('/', (req, res) => {
  res.send({
    author: package.author,
    env: env.ENV,
    version: package.version
  })
})  

app.listen(env.PORT, () => {
  console.log(`Backend listening on port ${env.PORT}`)
})
