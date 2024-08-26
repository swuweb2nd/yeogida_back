
// User 라우터 구현 

const express = require('express');
const User = require('../models/user');  //models의 user.js와 연결

const router = express.Router();


router.route('/login')
//router.route 메서드로 같은 라우트 경로는 하나로 묶는다.

// /users/login 으로 GET 요청이 들어올 때
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
  // /users/login 으로 POST 요청이 들어올 때
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        id: req.body.id,
        password: req.body.password,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 기능 추후 구현 예정

module.exports = router;