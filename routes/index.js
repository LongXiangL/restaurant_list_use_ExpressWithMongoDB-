// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')// 將網址結構符合/ 字串的 request 導向 home 模組 
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')   
const { authenticator } = require('../middleware/auth')


router.use('/restaurants', authenticator, restaurants)
router.use('/users',users)
router.use('/auth', auth)  // 掛載模組
router.use('/', authenticator, home)


module.exports = router// 匯出路由器