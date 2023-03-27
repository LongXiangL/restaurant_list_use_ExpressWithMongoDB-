// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')// 將網址結構符合/ 字串的 request 導向 home 模組 
const restaurants = require('./modules/restaurants')
const users= require('./modules/users')


router.use('/restaurants', restaurants)
router.use('/users',users)
router.use('/', home)


module.exports = router// 匯出路由器