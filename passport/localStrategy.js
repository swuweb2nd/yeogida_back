const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'id',  
    passwordField: 'password',
    passReqToCallback: false,
  }, async (id, password, done) => {
    try {
      const exUser = await User.findOne({ where: { id } });  //아이디로 기존회원이 있는지 찾는다

      if (exUser) {  //회원정보가 이미 있으면
        const result = await bcrypt.compare(password, exUser.password);  //비밀번호도 비교
        if (result) {     //비밀번호도 일치하면
        
          done(null, exUser);    //exUser로 사용자정보를 보내고, 로그인에 성공 

        } else {  // 로그인 실패 CASE 1 : 로그인 처리과정에서 비밀번호가 일치하지 않은 경우 
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {   // 로그인 실패 CASE 2 :로그인 처리과정에서 기존에 없는 회원일 때
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {  // 로그인 실패 CASE 3 :서버 쪽 에러 발생 시 
      console.error(error);
      done(error, false, {message: "서버오류로 인해 로그인이 실패했습니다."});
    }
  }));
};