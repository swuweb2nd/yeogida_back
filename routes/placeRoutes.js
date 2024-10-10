const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// 특정 여행일정에 대한 모든 여행장소 조회
router.get('/:itinerary_id/places', placeController.getPlacesByItineraryId);

// 특정 여행일정에 새로운 여행장소 추가
router.post('/:itinerary_id/places', placeController.createPlace);

// 특정 여행장소 조회
router.get('/places/:place_id', placeController.getPlaceById);

// 특정 여행장소 수정
router.put('/places/:place_id', placeController.updatePlace);

// 특정 여행장소 삭제
router.delete('/places/:place_id', placeController.deletePlace);

// 장소 검색 API 추가
router.get('/search', placeController.searchPlaces);

module.exports = router;
