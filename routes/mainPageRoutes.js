const express = require('express');
const router = express.Router();
const mainPageController = require('../controllers/mainPageController');
//const { isLoggedIn, isNotLoggedIn} = require('../middlewares');

// 1. 7일간의 게시물 조회 (인기순 및 최신순)
router.get('/recent',  mainPageController.getRecentItineraries);

// 2. 가장 많이 여행한 도시 Top 5 조회
router.get('/top-destinations', mainPageController.getTopDestinations);

// 3. 일정 검색 기능 (제목, 목적지, 설명에서 검색)
router.get('/search',  mainPageController.searchItineraries);

module.exports = router;
