// 引用 Express 與 Express 路由器
const express = require('express')
const restaurant = require('../../models/restaurant')
const router = express.Router()
const Restaurant = require('../../models/restaurant') // 載入 restaurant model



//新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
//新增餐廳
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantData = {
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: userId
  };
  return Restaurant.create({ ...restaurantData })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//瀏覽特定頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//編輯餐廳頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// 更新餐廳
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const restaurantData = {
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  };
  //return Restaurant.findOneAndUpdate({ _id }, restaurantData) mongodb4版後棄用，要用需修改參數useFindAndModify: false
  return Restaurant.findOne({ _id })
    .then(restaurant => {
      restaurant.set(restaurantData);
      return restaurant.save();
    })  
  .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})



// 刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})


// 匯出路由模組
module.exports = router
