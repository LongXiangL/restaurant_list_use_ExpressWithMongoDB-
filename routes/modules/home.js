// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant') // 載入 restaurant model

// 瀏覽全部餐廳
router.get('/', (req, res) => {
  Restaurant.find() // 取出 model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//index search function
router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})//資料庫中尋找特定資料
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        restaurantData =>
          restaurantData.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurantData.category.includes(keyword)
      )
      res.render('index.hbs', { restaurants: filterRestaurants, keywords })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router