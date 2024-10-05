const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const { pageLogin,pageSignup, pagePw, pageId, pageIdSuccess, pageResetPw } = require('../controllers/user');  //페이지 렌더링 (GET)
const { signup, login, logout, findpw, findid, resetpw, verifyid, verifyphone, verifynumber, sendnumberSignup, sendnumberIDPW } = require('../controllers/user'); // 기능 (POST)



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
router.get('/login', isNotLoggedIn, pageLogin);

// GET /users/signup - 회원가입 페이지 조회
router.get('/login', isNotLoggedIn, pageSignup);

// POST /users/find/id - 아이디 찾기
router.post('/find/id', isNotLoggedIn, findid);

// POST /users/find/pw - 비밀번호 찾기
router.post('/find/pw', isNotLoggedIn, findpw);

// GET /users/find/id - 아이디찾기 페이지 조회 
router.get('/find/id', isNotLoggedIn, pageId);

// GET /users/find/pw - 비밀번호찾기 페이지 조회
router.get('/find/pw', isNotLoggedIn, pagePw);

// GET /users/find/id/success?by=email - 아이디찾기성공 페이지 조회
router.get('/find/id/success?by=email ', isNotLoggedIn, pageIdSuccess);

// POST /users/reset-pw?token=${token} - 비밀번호 재설정
router.post('/reset-pw?token=${token}', isNotLoggedIn, resetpw);

// GET /users/reset-pw?token=${token} - 비밀번호재설정 페이지 조회
router.get('/reset-pw?token=${token}', isNotLoggedIn, pageResetPw);

// GET /users/verify-id - 아이디 중복확인
router.get('/verify-id', isNotLoggedIn, verifyid);

// GET /users/verify-phone - 전화번호 중복확인
router.get('/verify-phone', isNotLoggedIn, verifyphone);

// POST /users/signup-sendnum  - 회원가입용 인증번호 전송
router.post('/signup-sendnum', isNotLoggedIn, sendnumberSignup);

// POST /users/idpw-sendnum - id/pw찾기용 인증번호 전송
router.post('/idpw-sendnum', isNotLoggedIn, sendnumberIDPW);

// POST /users/verify-number - 회원가입용 인증번호 확인하기
router.post('/verify-number', isNotLoggedIn, verifynumber);

module.exports = router;