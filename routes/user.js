const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { signup, login, logout } = require('../controllers/user');

const router = express.Router();

// POST /users/login - 로그인하기
router.post('/login', isNotLoggedIn, login); 

// POST /users/signup - 회원가입하기
router.post('/signup', isNotLoggedIn, signup);

// POST /users/logout - 로그아웃하기
router.post('/logout', isLoggedIn, logout);

// GET /users/login - 로그인 페이지 조회
router.get('/login', isNotLoggedIn, login)

// GET /users/signup - 회원가입 페이지 조회

// POST /users/find/id - 아이디 찾기

// POST /users/find/pw - 비밀번호 찾기

// GET /users/find/id - 아이디찾기 페이지 조회

// GET /users/find/pw - 비밀번호찾기 페이지 조회

// GET /users/find/id/success - 아이디찾기성공 페이지 조회

// POST /users/reset-pw/${token} - 비밀번호 재설정

// GET /users/reset-pw/${token} - 비밀번호재설정 페이지 조회


module.exports = router;