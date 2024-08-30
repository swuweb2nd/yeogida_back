const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');  //models/user.js와 연결

//로그인
exports.login = async (req, res, next) => {
    const {id, password} = req.body;
    try{

    } catch (error) {
        console.error(error);
        return next(error);
    }
}
//로그아웃
exports.logout = async (req, res, next) => {

}
//회원가입
exports.signup = async (req, res, next) => {
    
}