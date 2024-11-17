const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { verifyToken } = require('../middlewares');

// 전체 여행일정 조회
router.get('/', verifyToken, itineraryController.getItineraries);

// 새로운 여행일정 생성
router.post('/', verifyToken, itineraryController.createItinerary);

// 특정 여행일정 조회
router.get('/:itinerary_id', verifyToken, itineraryController.getItineraryById);

// 특정 여행일정 수정
router.put('/:itinerary_id', verifyToken, itineraryController.updateItinerary);

// 특정 여행일정 삭제
router.delete('/:itinerary_id', verifyToken, itineraryController.deleteItinerary);

module.exports = router;
