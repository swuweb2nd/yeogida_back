const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderLogin, renderSignup } = require('../controlers/user');  //페이지 렌더링 (GET)
const { signup, login, logout } = require('../controllers/user'); // 기능 (POST)

const router = express.Router();

// POST /users/login - 로그인하기
router.post('/login', isNotLoggedIn, login); 

// POST /users/signup - 회원가입하기
router.post('/signup', isNotLoggedIn, signup);

// POST /users/logout - 로그아웃하기
router.post('/logout', isLoggedIn, logout);

// GET /users/login - 로그인 페이지 조회
router.get('/login', isNotLoggedIn, renderLogin)

// GET /users/signup - 회원가입 페이지 조회
router.get('/login', isNotLoggedIn, renderSignup)

// POST /users/find/id - 아이디 찾기

// POST /users/find/pw - 비밀번호 찾기

// GET /users/find/id - 아이디찾기 페이지 조회

// GET /users/find/pw - 비밀번호찾기 페이지 조회

// GET /users/find/id/success - 아이디찾기성공 페이지 조회

// POST /users/reset-pw/${token} - 비밀번호 재설정

// GET /users/reset-pw/${token} - 비밀번호재설정 페이지 조회


module.exports = router;