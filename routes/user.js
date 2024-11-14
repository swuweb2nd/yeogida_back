const express = require('express');

const { tokenVerify } = require('../middlewares');
const { pageIdSuccess, pageResetPw } = require('../controllers/user');  //페이지 렌더링 (GET)
const { signup, login, logout, findpw, findid, resetpw, verifyid, verifyphone, verifynumber, sendnumberSignup, sendnumberIDPW } = require('../controllers/user'); // 기능 (POST)



const router = express.Router();




// POST /users/login - 로그인하기
router.post('/login', login); 

// POST /users/signup - 회원가입하기
router.post('/signup', signup);

// POST /users/logout - 로그아웃하기
router.post('/logout', tokenVerify, logout);

// POST /users/find/id - 아이디 찾기
router.post('/find/id', findid);

// POST /users/find/pw - 비밀번호 찾기
router.post('/find/pw', findpw);

// GET /users/find/id/success - 아이디찾기성공 페이지 조회
router.get('/find/id/success', pageIdSuccess);

//프론트에서는 다음과 같이 요청
//GET /users/find/id/success?by=email&id=사용자아이디





// POST /users/reset-pw?token=${token} - 비밀번호 재설정
router.post('/reset-pw?token=${token}', resetpw);

// GET /users/reset-pw?token=${token} - 비밀번호재설정 페이지 조회
router.get('/reset-pw?token=${token}', pageResetPw);



// POST /users/verify-id - 아이디 중복확인
router.post('/verify-id', verifyid);
//get요청은 바디에 뭔갈 넣을 수 없음 post로 바꾸기

// POST /users/verify-phone - 전화번호 중복확인
router.post('/verify-phone', verifyphone);

// POST /users/signup-sendnum  - 회원가입용 인증번호 전송
router.post('/signup-sendnum', sendnumberSignup);

// POST /users/idpw-sendnum - id/pw찾기용 인증번호 전송
router.post('/idpw-sendnum', sendnumberIDPW);

// POST /users/verify-number - 회원가입용 인증번호 확인하기
router.post('/verify-number', verifynumber);

module.exports = router;