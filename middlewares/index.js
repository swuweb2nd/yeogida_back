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
};
*/
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // 1. Authorization 헤더가 존재하지 않을 때 처리
    if (!authHeader) {
      console.error("Authorization 헤더가 없습니다.");
      return res
        .status(403)
        .json({ message: "유효하지 않은 인증 헤더입니다." });
    }

    // 2. Bearer 토큰 형식인지 확인
    if (!authHeader.startsWith("Bearer ")) {
      console.error("Authorization 헤더가 Bearer 형식이 아닙니다.");
      return res
        .status(403)
        .json({ message: "유효하지 않은 인증 헤더입니다." });
    }

    // 3. 토큰 추출
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰 검증

    // 4. 디코드된 토큰 로그 추가
    console.log("🛠️ Decoded Token:", decoded);

    // 5. 검증된 토큰 정보를 res.locals에 저장
    res.locals.decoded = decoded;

    return next(); // 다음 미들웨어로 이동
  } catch (error) {
    // 6. 토큰 만료 또는 유효하지 않은 토큰 처리
    if (error.name === "TokenExpiredError") {
      console.error("토큰이 만료되었습니다.");
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }

    console.error("유효하지 않은 토큰입니다:", error);
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
