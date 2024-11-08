const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');


// 장소 검색 API 추가 (고유한 경로로 설정)
router.get('/places/search', isLoggedIn, placeController.searchPlaces);

// 특정 여행일정에 대한 모든 여행장소 조회
router.get('/:itinerary_id/places',isLoggedIn, placeController.getPlacesByItineraryId);

// 특정 여행일정에 새로운 여행장소 추가
router.post('/:itinerary_id/places', isLoggedIn, placeController.createPlace);

// 특정 여행장소 조회
router.get('/places/:place_id',isLoggedIn, placeController.getPlaceById);

// 특정 여행장소 수정
router.put('/places/:place_id',isLoggedIn, placeController.updatePlace);

// 특정 여행장소 삭제
router.delete('/places/:place_id',isLoggedIn, placeController.deletePlace);


module.exports = router;
