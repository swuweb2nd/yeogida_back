const passport = require('passport');
const local = require ('./localStrategy');
const User = require('../models/user');


// JWT토큰 사용으로 세션은 사용하지 않기 때문에 비활성화
/*
module.exports = () => {
    // 사용자 정보 객체에서 id만 추려서 세션에 저장한다.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 세션에 저장한 아이디를 통해, 사용자 정보 객체를 불러온다. (매 요청마다 실행됨)
    passport.deserializeUser((id, done) => {
        User.findOne({where:{id}})
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local();
} */ 

