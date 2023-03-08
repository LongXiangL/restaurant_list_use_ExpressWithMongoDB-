const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
const methodOverride = require("method-override")// 載入 method-override
const bodyParser = require('body-parser')// 引用 body-parser

// 引用路由器
const routes = require('./routes/index')




// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.use(express.static("public"))//使用public中的css設定
app.set('view engine', 'hbs')// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(methodOverride("_method"))// 設定每一筆請求都會透過 methodOverride 進行前置處理

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB


// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')// 連線異常
})
db.once('open', () => {
  console.log('mongodb connected!')// 連線成功
})


//設定路由

app.use(routes)// 將 request 導入路由器



//設定port
app.listen(3000, () => {
  console.log('app is running on http://localhost3000')
})