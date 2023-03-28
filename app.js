const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")// 載入 method-override
const bodyParser = require('body-parser')// 引用 body-parser

const routes = require('./routes/index')// 引用路由器
require('./config/mongoose')

const app = express()

//template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.use(express.static("public"))//使用public中的css設定
app.set('view engine', 'hbs')
app.use(methodOverride("_method"))// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))//透過 body-parser前置處理所有資料
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)// 將 request 導入路由器

app.listen(3000, () => {
  console.log('app is running on http://localhost3000')
})