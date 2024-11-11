const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const { pageIdSuccess, pageResetPw } = require('../controllers/user');  //페이지 렌더링 (GET)
const { refreshAccessToken, getMe, signup, login, logout, findpw, findid, resetpw, verifyid, verifyphone, verifynumber, sendnumberSignup, sendnumberIDPW } = require('../controllers/user'); // 기능 (POST)



const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user; //넌적스(템플릿엔진)에서 user 객체를 통해 사용자 정보에 접근할 수 있다.
    //팔로잉 여부, 관리자 여부 등의 미들웨어를 만들어 활용할 수 있음. 
    next();
});

// POST /users/refresh - 리프레시 토큰을 사용하여 액세스 토큰 재발급
router.post('/refresh', refreshAccessToken);

// POST /users/me - 로그인 상태 확인
router.post('/me', isLoggedIn, getMe);

// POST /users/login - 로그인하기
router.post('/login', isNotLoggedIn, login); 

// POST /users/signup - 회원가입하기
router.post('/signup', isNotLoggedIn, signup);

// POST /users/logout - 로그아웃하기
router.post('/logout', isLoggedIn, logout);

// POST /users/find/id - 아이디 찾기
router.post('/find/id', isNotLoggedIn, findid);

// POST /users/find/pw - 비밀번호 찾기
router.post('/find/pw', isNotLoggedIn, findpw);

// GET /users/find/id/success - 아이디찾기성공 페이지 조회
router.get('/find/id/success', isNotLoggedIn, pageIdSuccess);

//프론트에서는 다음과 같이 요청
//GET /users/find/id/success?by=email&id=사용자아이디





// POST /users/reset-pw?token=${token} - 비밀번호 재설정
router.post('/reset-pw?token=${token}', isNotLoggedIn, resetpw);

// GET /users/reset-pw?token=${token} - 비밀번호재설정 페이지 조회
router.get('/reset-pw?token=${token}', isNotLoggedIn, pageResetPw);



// POST /users/verify-id - 아이디 중복확인
router.post('/verify-id', isNotLoggedIn, verifyid);
//get요청은 바디에 뭔갈 넣을 수 없음 post로 바꾸기

// POST /users/verify-phone - 전화번호 중복확인
router.post('/verify-phone', isNotLoggedIn, verifyphone);

// POST /users/signup-sendnum  - 회원가입용 인증번호 전송
router.post('/signup-sendnum', isNotLoggedIn, sendnumberSignup);

// POST /users/idpw-sendnum - id/pw찾기용 인증번호 전송
router.post('/idpw-sendnum', isNotLoggedIn, sendnumberIDPW);

// POST /users/verify-number - 회원가입용 인증번호 확인하기
router.post('/verify-number', isNotLoggedIn, verifynumber);

module.exports = router;