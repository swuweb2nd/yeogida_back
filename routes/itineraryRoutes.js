const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// 전체 여행일정 조회
router.get('/', itineraryController.getItineraries);

// 새로운 여행일정 생성
router.post('/', itineraryController.createItinerary);

// 특정 여행일정 조회
router.get('/:itinerary_id', itineraryController.getItineraryById);

// 특정 여행일정 수정
router.put('/:itinerary_id', itineraryController.updateItinerary);

// 특정 여행일정 삭제
router.delete('/:itinerary_id', itineraryController.deleteItinerary);

module.exports = router;
