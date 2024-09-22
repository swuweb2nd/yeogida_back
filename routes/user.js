const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const { renderLogin, renderSignup, renderPw, renderId, renderIdSuccess, renderResetPw } = require('../controllers/user');  //페이지 렌더링 (GET)
const { signup, login, logout, findpw, findid, resetpw, verifyid, verifyphone, verifynumber, sendnumber } = require('../controllers/user'); // 기능 (POST)



const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user; //넌적스(템플릿엔진)에서 user 객체를 통해 사용자 정보에 접근할 수 있다.
    //팔로잉 여부, 관리자 여부 등의 미들웨어를 만들어 활용할 수 있음. 
    next();
});

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
router.post('/find/id', isNotLoggedIn, findid);

// POST /users/find/pw - 비밀번호 찾기
router.post('/find/pw', isNotLoggedIn, findpw);

// GET /users/find/id - 아이디찾기 페이지 조회 
router.get('/find/id', isNotLoggedIn, renderId)

// GET /users/find/pw - 비밀번호찾기 페이지 조회
router.get('/find/pw', isNotLoggedIn, renderPw)

// GET /users/find/id/success - 아이디찾기성공 페이지 조회
router.get('/find/id/success', isNotLoggedIn, renderIdSuccess)

// POST /users/reset-pw?token=${token} - 비밀번호 재설정
router.post('reset-pw?token=${token}', isNotLoggedIn, resetpw);

// GET /users/reset-pw?token=${token} - 비밀번호재설정 페이지 조회
router.get('reset-pw?token=${token}', isNotLoggedIn, renderResetPw)

// GET /users/verify-id - 아이디 중복확인
router.get('/verify-id', isNotLoggedIn, verifyid);

// GET /users/verify-phone - 전화번호 중복확인
router.get('/verify-phone', isNotLoggedIn, verifyphone);

// POST /users/send-number - 인증번호 메일로 전송
router.post('/send-number', isNotLoggedIn, sendnumber);

// POST /users/verify-number - 인증번호 검증
router.post('/verify-number', isNotLoggedIn, verifynumber);

module.exports = router;