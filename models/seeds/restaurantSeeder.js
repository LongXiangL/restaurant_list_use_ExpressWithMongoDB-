if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const User = require('../user')
const bcrypt = require('bcryptjs')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USERS[0].password, salt))
    .then(hash => {
      return Promise.all(
        Array.from({ length: SEED_USERS.length }, (_, i) =>
          User.create({
            name: SEED_USERS[i].name,
            email: SEED_USERS[i].email,
            password: hash,
          })
        )
      )
    })
    .then(users => {
      const userId = users.map(user => user._id)
      const restaurants = []
      Array.from(SEED_USERS, (user, index) => {
        Array.from(user.restaurantIndex, index => {
          const restaurant = { ...restaurantList[index], userId: userId[SEED_USERS.indexOf(user)] }
          restaurants.push(restaurant)
        })
      })
      return Promise.all(
        Array.from({ length: restaurants.length }, (_, i) =>
          Restaurant.create(restaurants[i])
        )
      )
    })
//參考同學想學習的寫法
      // Promise.all(SEED_USER.map((SEED_USER) =>
      //   bcrypt
      //     .genSalt(10)
      //     .then(salt => bcrypt.hash(SEED_USER.password, salt))
      //     .then(hash => User.create({
      //       name: SEED_USER.name,
      //       email: SEED_USER.email,
      //       password: hash
      //     }))
      //     .then(user => {
      //       const restaurantSeeds = SEED_USER.restaurantIndex.map(index => {
      //         restaurantList[index].userId = user._id
      //         return restaurantList[index]
      //       })
      //       return Restaurant.create(restaurantSeeds)
      //     })
      // ))

    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})


