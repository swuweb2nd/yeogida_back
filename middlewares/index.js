const jwt = require("jsonwebtoken");

/*
// 로그인 상태 관련 미들웨어(1106수정)
exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json("로그인이 필요합니다."); // 토큰이 없으면 로그인 필요 응답
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 유저 정보를 요청 객체에 저장
    return next(); // 인증에 성공하면 다음 미들웨어로 이동
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 액세스 토큰이 만료된 경우
      return res.status(419).json("토큰이 만료되었습니다."); //419일때 프론트에서 
    }
    return res.status(401).json("유효하지 않은 토큰입니다.");
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
    //return res.redirect('https://www.yeogida.net'); //메인으로 이동 - 리디렉션으로 로그인방지
    return res.status(403).json({ message: "이미 로그인된 상태입니다." });
  }
};*/

// 토큰 검증 (로그인 상태 검증) 
exports.tokenVerify = (req, res, next) => {
  // 요청 헤더에서 토큰을 가져오기
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

  // 토큰이 없는 경우 로그인 상태 아님
  if (!token) {
      return res.status(401).json({ message: '로그인되지 않은 사용자입니다.' });
  }

  // 토큰 검증
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          // 유효하지 않은 토큰일 경우
          return res.status(401).json({ message: '유효하지 않은 토큰입니다. 다시 로그인하세요.' });
      }

      // 유효한 토큰일 경우, 유저 정보 저장
      req.user = decoded; // id, nickname 등 토큰에 포함된 정보 저장
      next(); // 다음 미들웨어 또는 컨트롤러로 이동
  });
};