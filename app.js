const express = require('express')

const app = express()

//設定路由
app.get('/', (req, res) => {
  res.send('hello world')
})
//設定port
app.listen(3000, () => {
  console.log('app is running on http://localhost3000')
})