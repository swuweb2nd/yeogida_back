const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');  //models/user.js와 연결

//로그인
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => { //로그인요청이 들어오면 local 로그인전략을 수행 
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/login');
        });
    })(req, res, next);
};

//로그아웃
exports.logout = (req, res) => {
    req.logout(() => {
      res.redirect('/');  //로그아웃하면 여기다 메인페이지로 redirect (여기다 메인페이지 api 넣기)
    });
  };

//회원가입
exports.signup = async (req, res, next) => {
    const { id, password, passwordCheck, name, email, phonenumber, birth } = req.body;
    try{
        const exUser = await User.findOne( {where: {email}}); //email로 기존에 가입한 회원정보가 있는지 확인 (수정가능)
        if(exUser){
            return res.redirect('/signup?error=exist') // 기존가입한 회원정보가 있으면, 회원가입 페이지로 되돌려보낸다
        }
        // 입력된 정보로 사용자정보를 생성 (비밀번호 서로 일치하는지 확인 후, 암호화하여 DB에 저장) 
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id,
            password: hash,
            passwordCheck,
            name,
            email,
            phonenumber,
            birth,
        });
        return res.redirect('/signup');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};