const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Node!')
})

app.listen(port, () => {
  console.log(`Example index.js listening at http://localhost:${port}`)
})
