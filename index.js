const express = require('express');

const { sequelize } = require('./models');

//로그인, 로그아웃 구현을 위한 passport 모듈 연결 - sdh
const passport = require('passport');
const passportConfig = require('./passport');

const app = express();

passportConfig(); //패스포트 설정 - sdh
app.use(passport.initialize()); //미들웨어 : 요청에 passport정보를 심음 - sdh
app.use(passport.session()); //미들웨어 : req.session에 passport정보를 심음 - sdh

const port = process.env.PORT || 3000;

app.use(express.json()); // 추가된 부분
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/mypage/account', require('./routes/account'));    //mypage/account로 들어왔을 때 routes의 account 파일로
app.use('/shared-itineraries', require('./routes/shared-itineraries'));

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

//swagger 설정 관련 코드
// swagger.js 파일에서 가져옴
const { swaggerUi, specs } = require('./swagger/swagger'); 
// Swagger UI 경로 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//swagger 설정 코드 끝