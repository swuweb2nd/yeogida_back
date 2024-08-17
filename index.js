const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//swagger 설정 관련 코드

// swagger.js 파일에서 가져옴
const { swaggerUi, specs } = require('./swagger/swagger'); 
// Swagger UI 경로 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//swagger 설정 코드 끝