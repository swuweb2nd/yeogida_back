const express = require("express");
require("dotenv").config();

const { sequelize } = require("./models");

// Passport 설정
const passport = require("passport");
const passportConfig = require("./passport/localStrategy");
passportConfig();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const deleteExpiredCodes = require("./cron/deleteExpiredCodes");

// CronJob 시작
deleteExpiredCodes.start();

const app = express();

// CORS 설정 - Origin이 없거나 null일 경우도 허용하도록 개선
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://yeogida.net",
      "https://www.yeogida.net",
      "http://localhost",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      // Origin이 없거나 허용된 도메인일 경우 허용
      callback(null, true);
    } else {
      // Origin이 허용되지 않은 경우 에러 반환
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // 쿠키 허용
  methods: "GET, POST, DELETE, PATCH, PUT, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

// CORS 설정 적용
app.use(cors(corsOptions));

// OPTIONS 요청에 대한 CORS 응답 처리
app.options("*", cors(corsOptions));

// 정적 파일 요청에 CORS 적용
app.use("/static", cors(corsOptions), express.static("static"));

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport 초기화
app.use(passport.initialize());

const port = process.env.PORT || 80;

// 메인 페이지 리다이렉트 문제 해결
// 리다이렉트를 제거하고 JSON 응답 반환
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Yeogida!" });
});

// Health Check API
app.get("/health", (req, res) => {
  res.status(200).send("Success HealthCheck");
});

// API 라우터 설정
app.use("/users", require("./routes/user"));
app.use("/mypage", require("./routes/mypage"));
app.use("/sharedItinerary", require("./routes/sharedItinerariesRoutes"));
app.use("/api/main", require("./routes/mainPageRoutes"));
app.use("/api", require("./routes/placeRoutes"));
app.use("/api/itineraries", require("./routes/itineraryRoutes"));

const imageRoutes = require('./routes/imageRoutes'); // 이미지 라우터 불러오기
app.use('/images', imageRoutes);

// Swagger 설정
const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
