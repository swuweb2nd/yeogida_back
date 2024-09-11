const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');  //models/user.js와 연결
const jwt = require('jsonwebtoken');

//로그인
exports.login = (req, res, next) => {
    passport.authenticate('local', {session : false}, (authError, user, info) => { //로그인요청이 들어오면 local 로그인전략을 수행 
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        //로그인 성공 시 실행부분
        return req.login(user,{ session: false }, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // JWT 토큰 발급
            const token = jwt.sign({
                id: user.id,
                nick: user.nickname,
            }, process.env.JWT_SECRET, {
                expiresIn: '10m',  // 토큰 유효기간
                issuer: 'yeogida',  // 발급자
            });


            // 토큰을 쿠키에 저장
            res.cookie('token', token, {
                httpOnly: true,  // HTTP에서만 쿠키 보내도록 설정
                secure: process.env.NODE_ENV === 'development',  // 개발모드 : development, 배포모드 : production
                maxAge: 600000,  // 10분
            });

            // 메인페이지로 리다이렉트
            return res.redirect('/');
        });
    })(req, res, next);
};

//로그아웃
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',  // 개발모드 
    });
    res.redirect('/');  //로그아웃 성공 -> 메인페이지로 redirect (여기다 메인페이지 api 넣기)
  };

//회원가입
exports.signup = async (req, res, next) => {
    const { id, password, name, email, phonenumber, birth } = req.body;
    
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (password !== passwordCheck) {
        return res.redirect('/signup?error=passwordsNotMatch'); // 비밀번호 불일치 시 에러 처리
    }
    try{
        const exUser = await User.findOne( {where: {email}}); //email로 기존에 가입한 회원정보가 있는지 확인 (수정가능)
        if(exUser){
            return res.redirect('/signup?error=exist') // 기존가입한 회원정보가 있으면, 회원가입 페이지로 되돌려보낸다
        }
        // 비밀번호 암호화
        const hash = await bcrypt.hash(password, 12);

        // 사용자 정보 생성
        await User.create({
            id,
            password: hash,
            name,
            email,
            phonenumber,
            birth,
        });
        return res.redirect('/login');  // 회원가입 성공 후 로그인페이지로 리다이렉트
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

//아이디 찾기
exports.findid = async (req, res, next) => {
    const { name, birth, phonenumber } = req.body;
    try{
		    // 중복이없는 phonenumber 로 기존에 가입한 회원정보가 있는지 확인
        const exUser = await User.findOne( {where: {phonenumber}});  
        if (exUser) {      // 회원정보가 이미 있으면
        
	        // 요청온 birth, phonenumber와 일치하는지 비교
	        if (exUser.name == name && exUser.birth == birth){
		        
		        // 응답에 id를 담아 보낸다.
		        res.render('find/id/success', {
                Findid: name   // 프론트 -> <%= Findid %>
            });
	        }
	      }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};



//페이지 렌더링 관련 라우터

exports.renderLogin = (req, res) => {
	res.render('login');
};

exports.renderSignup = (req, res) => {
	res.render('signup');
};

exports.renderPw = (req, res) => {
	res.render('find/pw');
};

exports.renderId = (req, res) => {
	res.render('find/id');
};

exports.renderIdSuccess = (req, res) => {
	res.render('find/id/success');
};

exports.renderResetPw = (req, res) => {
	res.render('reset-pw/${token}');
};