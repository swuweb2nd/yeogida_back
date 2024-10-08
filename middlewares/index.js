const jwt = require('jsonwebtoken');


//토큰 검증 미들웨어 
exports.verifyToken = (req, res, next) => {
    try {
      //jwt토큰을 httponly 쿠키에 저장했기 때문에, 쿠키에서 가져와 검증한다.
      const token = req.cookies.token;

      res.locals.decoded = jwt.verify(token, process.env.JWT_SECRET); 
      return next();  //토큰검증 성공하면 넘어가기
    } catch (error) {
      if (error.name === 'TokenExpiredError') { // 유효기간 초과
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다',
        });
      }
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다',
      });
    }
  };



// 로그인 상태 관련 미들웨어
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인 한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};
