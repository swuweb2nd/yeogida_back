const express = require('express');
require('dotenv').config();  

const { sequelize } = require('./models');

//로그인, 로그아웃 구현을 위한 passport 모듈 연결 - sdh
const passport = require('passport');

const cookieParser = require('cookie-parser');

//비밀번호재설정 - 쿠키관련 - CORS 설정 - sdh
const cors = require('cors');

const app = express();


//CORS 설정 - sdh
const corsOptions = {
  origin: 'https://yeogida.net',  // 허용할 프론트엔드 도메인(특정 도메인에서만 쿠키 허용하도록)
  credentials: true,  // 쿠키를 허용하려면 true로 설정
};

// passport 초기화 
app.use(passport.initialize());
// CORS 미들웨어 적용
app.use(cors(corsOptions));

const port = process.env.PORT || 80;


//미들웨어설정 
app.use(express.json()); // 추가된 부분
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // 쿠키설정

/*
app.get('/', (req, res) => {
  res.send('소프트웨어융합학과 소학회 SWUWEB TEAMB YEOGIDA 입니다.');
});*/
app.get('/', (req, res) => {
  res.redirect('/itineraries/recent'); // 메인 페이지로
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
app.use('/', mainPageRoutes);

//swagger 설정 관련 코드
// swagger.js 파일에서 가져옴
const { swaggerUi, specs } = require('./swagger/swagger'); 
// Swagger UI 경로 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//swagger 설정 코드 끝