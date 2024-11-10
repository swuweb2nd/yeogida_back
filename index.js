const express = require('express');
require('dotenv').config();  

const { sequelize } = require('./models');

//로그인, 로그아웃 구현을 위한 passport 모듈 연결 - sdh
const passport = require('passport');
//로컬로그인 전략설정파일을 불러오기 - sdh(1013)
const passportConfig = require('./passport/localStrategy');
passportConfig();


const cookieParser = require('cookie-parser');

//비밀번호재설정 - 쿠키관련 - CORS 설정 - sdh
const cors = require('cors');

//토큰삭제cron 호출 
const deleteExpiredCodes = require('./cron/deleteExpiredCodes');
// CronJob 시작
deleteExpiredCodes.start();

const app = express();


//CORS 설정 - sdh
const corsOptions = {
  origin: ['https://yeogida.net', 'http://localhost', 'https://www.yeogida.net'],  // 허용할 프론트엔드 도메인 추가
  // 허용할 프론트엔드 도메인(특정 도메인에서만 쿠키 허용하도록)
  credentials: true,  // 쿠키를 허용하려면 true로 설정
  methods: 'GET, POST, DELETE, PATCH,PUT, OPTIONS',
  allowedHeaders: '*',
};





// 모든 응답에 대한 CORS 헤더 설정
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yeogida.net');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});*/



// passport 초기화 
app.use(passport.initialize());



const port = process.env.PORT || 80;


//미들웨어설정 
app.use(express.json()); // 추가된 부분
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // 쿠키설정


// CORS 미들웨어 적용(passport 초기화 코드보다 앞에 설정)
app.use(cors(corsOptions));

/*
app.get('/', (req, res) => {
  res.send('소프트웨어융합학과 소학회 SWUWEB TEAMB YEOGIDA 입니다.');
});*/

/*
app.get('/', (req, res) => {
  res.send('소프트웨어융합학과 소학회 SWUWEB TEAMB YEOGIDA 입니다.');
});*/


// 도메인에 접속하면 메인 페이지로 리다이렉트
app.get('/', (req, res) => {
  res.redirect('/api/main/recent');  // 메인 페이지로 리다이렉트
});

//GET /health 요청에 대해 상태코드 200으로 응답하는 API
app.get('/health', (req, res) =>{
  res.status(200).send("Success HealthCheck");
})


app.use('/users', require('./routes/user'));
app.use('/mypage', require('./routes/mypage'));    //mypage로 들어왔을 때 routes의 mypage파일로
app.use('/sharedItinerary', require('./routes/sharedItinerariesRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize.sync({ force: false})
  .then(()=> {
    console.log('데이터베이스 연결 성공'); 
  })
  .catch((err)=>{
    console.error(err);
  });



// 메인 페이지 라우트 추가
const mainPageRoutes = require('./routes/mainPageRoutes');
app.use('/api/main', mainPageRoutes);
// place 관련 라우트 추가
const placeRoutes = require('./routes/placeRoutes');
app.use('/api', placeRoutes);
// 여행 일정 라우트 추가
const itineraryRoutes = require('./routes/itineraryRoutes');
app.use('/api/itineraries', itineraryRoutes);


//swagger 설정 관련 코드
// swagger.js 파일에서 가져옴
const { swaggerUi, specs } = require('./swagger/swagger'); 
// Swagger UI 경로 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//swagger 설정 코드 끝