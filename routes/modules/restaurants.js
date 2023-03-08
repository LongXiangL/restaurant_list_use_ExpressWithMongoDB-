// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model


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
      res.render('index', { restaurants: filterRestaurants, keywords })
    })
    .catch(error => console.log(error))
})

//新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
//新增餐廳
router.post('/', (req, res) => {
  const name = req.body       // 從 req.body 拿出表單裡的 name 資料
  return Restaurant.create(name)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//瀏覽特定頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//更新餐廳
router.put("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndUpdate(restaurantId, req.body)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})


// 刪除餐廳
router.delete("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})




// 匯出路由模組
module.exports = router
