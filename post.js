const express = require('express')
const { result } = require('.')
const app = express()

app.use(express.static('site')) //diretorio padrão

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  next()
})

app.get('/algo', (req, res) => {
  res.send(result)
})

app.listen(3000, () => {
    console.log("app online")
})