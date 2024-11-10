const jwt = require("jsonwebtoken");

//토큰 검증 미들웨어
exports.verifyToken = (req, res, next) => {
  try {
    //jwt토큰을 httponly 쿠키에 저장했기 때문에, 쿠키에서 가져와 검증한다.
    const token = req.cookies.token;

    res.locals.decoded = jwt.verify(token, process.env.JWT_SECRET);
    return next(); //토큰검증 성공하면 넘어가기
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};

// 로그인 상태 관련 미들웨어(1106수정)
exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.token; // 쿠키에 저장된 토큰을 가져옵니다

  if (!token) {
    return res.status(403).send("로그인이 필요합니다."); // 토큰이 없으면 로그인 필요 응답
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰 검증
    req.user = decoded; // 유저 정보를 요청 객체에 저장
    return next(); // 인증에 성공하면 다음 미들웨어로 이동
  } catch (error) {
    return res.status(401).send("유효하지 않은 토큰입니다."); // 토큰이 유효하지 않으면 401 에러 응답
  }
};

// 비로그인 상태 관련 미들웨어(1106수정)
exports.isNotLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(); // 토큰이 없으면 비로그인 상태로 인식, 다음 미들웨어로 이동
  } else {
    // 로그인 상태일 경우 로그인 페이지로 리디렉션
    //return res.redirect('/'); // 로그인된 상태이므로 메인 페이지로 리디렉션
    //return res.redirect('https://www.yeogida.net'); //여기다 메인으로 리디렉션 (로그인상태인데 로그인하려고할때)
    return res.status(403).json({ message: "이미 로그인된 상태입니다." });
  }
};
