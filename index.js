const express = require('express');

const { sequelize } = require('./models');

//로그인, 로그아웃 구현을 위한 passport 모듈 연결 - sdh
const passport = require('passport');
//const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');

const app = express();

//passportConfig(); //패스포트 설정 - sdh


// passport 초기화 
app.use(passport.initialize());


const port = process.env.PORT || 80;


//미들웨어설정 
app.use(express.json()); // 추가된 부분
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // 쿠키설정

app.get('/', (req, res) => {
  res.send('소프트웨어융합학과 소학회 SWUWEB TEAMB YEOGIDA 입니다.');
});


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
app.use('/api', mainPageRoutes);

//swagger 설정 관련 코드
// swagger.js 파일에서 가져옴
const { swaggerUi, specs } = require('./swagger/swagger'); 
// Swagger UI 경로 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//swagger 설정 코드 끝