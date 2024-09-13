const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');  //models/user.js와 연결
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
                secure: process.env.NODE_ENV === 'production',  // 개발모드 : development, 배포모드 : production
                maxAge: 600000,  // 10분
            });

            // 메인페이지로 리다이렉트
            return res.redirect('/');
        });
    })(req, res, next);
};

//로그아웃
exports.logout = (res) => {
    res.clearCookie('token', {   //토큰을 삭제하여 로그아웃 구현
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // 개발모드 
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
            return res.redirect('/signup?error=exist') // 기존가입한 회원정보가 있으면, 에러 처리
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
    const { name, birth, email } = req.body;
    try{
		    // 중복이없는 email 로 기존에 가입한 회원정보가 있는지 확인
        const exUser = await User.findOne( {where: {email}});  
        if (exUser) {      // 회원정보가 이미 있으면
        
	        // 요청온 name, birth 와 일치하는지 비교
	        if (exUser.name == name && exUser.birth == birth){
		        
		        // 응답에 id를 담아 보낸다.
		        res.render('find/id/success', {
                Findid: id   // 프론트 -> <%= Findid %>
            });
	        }
	      }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

// 이메일 전송을 위한 transporter (nodemailer) 설정
const transporter = nodemailer.createTransport({
    service: 'Gmail',  // Gmail을 사용
    auth: {
        user: process.env.EMAIL_USER,  // 이메일 계정 - 추후 생성
        pass: process.env.EMAIL_PASS,  // 이메일 계정 비밀번호 - 추후 생성
    },
});

//비밀번호 찾기
exports.findpw = async (req, res, next) => {
    const { name, id, birth, email } = req.body;
    try{
        // 입력받은 정보가 모두 일치하는 회원이 있는지 확인
        const exUser = await User.findOne({
            where: {
                email,
                id,
                name,
                birth
            }
        });
        if (!exUser) {  // 사용자 정보가 없을 때
            return res.redirect('/find/pw?error=userNotFound'); // 에러 처리
        }

        // 일치하는 회원이 있으면

        // 비밀번호 재설정 토큰 생성 (JWT 토큰 사용)
        const token = jwt.sign({ id: exUser.id, email: exUser.email }, process.env.JWT_SECRET, {
            expiresIn: '10m'  // 토큰 유효기간 10분
        });

        // 비밀번호 재설정 URL
        const resetUrl = `(실제배포도메인)/reset-pw?token=${token}`;

        // 메일 내용 설정
        const mailOptions = {
            from: 'yeogida@gmail.com',  // 발신자 정보
            to: exUser.email,  // 수신자 이메일
            subject: '[여기다] 비밀번호 재설정 링크',
            text: `안녕하세요, ${exUser.name}님. 아래 링크를 클릭하여 비밀번호를 재설정해주세요.\n\n${resetUrl}`,
            html: `<p>안녕하세요, ${exUser.name}님. 아래 링크를 클릭하여 비밀번호를 재설정해주세요.</p><a href="${resetUrl}">${resetUrl}</a>`
        };

        // 이메일 전송
        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            message: '등록된 이메일로 비밀번호 재설정 링크를 보냈습니다.'
        });


    
	      
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

// 인증번호 전송을 위한 랜덤숫자 생성
function generateRandomCode(n) {
    let str = '';
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
}


// 랜덤인증번호 메일 전송
exports.sendnumber = async(req, res, next) => {
    const { email, name } = req.body;  // 요청에서 이메일과 이름을 가져옴
    code = generateRandomCode(6); // 6자리 랜덤 코드 생성
    try{
        const mailOptions = {
            from: 'yeogida@gmail.com',  // 발신자 정보
            to: email,  // 수신자 이메일
            subject: '[여기다] 인증번호 발송',
            text: `안녕하세요, ${name}님.\n\n인증번호 [${code}]를 입력하세요.`,
            html: `<p>안녕하세요, ${name}님.<a>인증번호 [${code}]를 입력하세요.</a>`
        };
    
        // 이메일 전송
        await transporter.sendMail(mailOptions);

        // 이메일 전송 성공 시 응답
        return res.status(200).json({
            message: '인증번호가 발송되었습니다. 이메일을 확인해주세요.'
        });
        
    }catch (error) {
        console.error(error);
        return next(error);
    }
    
};

// 인증번호 검증
exports.verifynumber = async (req, res, next) => {

};


// 아이디 중복확인
exports.verifyid = async(req, res, next) => {
    const { id } = req.body;
    try{
		// 입력받은 id 로 기존에 가입한 회원정보가 있는지 확인
        const exUser = await User.findOne( {where: {id}});  

        if (!exUser) {
            // 중복되지 않은 경우 - 200 상태 코드와 함께 성공 메시지 반환
            return res.status(200).json({
                message: '사용 가능한 아이디입니다.',
                checkedId: id,
            });
        } else {
            // 중복된 아이디가 있을 경우 - 409 상태 코드와 함께 에러 메시지 반환
            return res.status(409).json({
                message: '이미 사용 중인 아이디입니다.',
                checkedId: id,
            });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }

};

// 전화번호 중복확인 
exports.verifyphone = async(req, res, next) => {
    const { phonenumber } = req.body;
    try{
		// 입력받은 id 로 기존에 가입한 회원정보가 있는지 확인
        const exUser = await User.findOne( {where: {phonenumber}});  
        
        if (!exUser) {
            // 중복되지 않은 경우 - 200 상태 코드와 함께 성공 메시지 반환
            return res.status(200).json({
                message: '사용 가능한 전화번호입니다.',
                checkedId: phonenumber,
            });
        } else {
            // 중복된 아이디가 있을 경우 - 409 상태 코드와 함께 에러 메시지 반환
            return res.status(409).json({
                message: '이미 사용 중인 전화번호입니다.',
                checkedId: phonenumber,
            });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

// 비밀번호 재설정



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