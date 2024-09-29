const express = require('express');
const sharedItinerary = require('../controllers/sharedItinerary/sharedItinerary');
const commentController = require('../controllers/sharedItinerary/comment');
const likeController = require('../controllers/sharedItinerary/like');
const scrapController = require('../controllers/sharedItinerary/scrap');

const sharedItinerariesRoutes = express.Router(); // 라우터를 생성

// 공유된 일정 목록 조회 (최신순/인기순)
sharedItinerariesRoutes.get('/', sharedItinerary.getSharedItineraries);

// 특정 공유 일정 상세 조회
sharedItinerariesRoutes.get('/:shared_itineraries_id', sharedItinerary.getSharedItineraryById);

// 특정 일차 일정 조회
sharedItinerariesRoutes.get('/:shared_itineraries_id/day/:day', sharedItinerary.getItineraryDay);

// 댓글 작성
sharedItinerariesRoutes.post('/:shared_itineraries_id/comments', commentController.createComment);

// 댓글 수정
sharedItinerariesRoutes.put('/:shared_itineraries_id/comments', commentController.updateComment);

// 댓글 삭제
sharedItinerariesRoutes.delete('/:shared_itineraries_id/comments', commentController.deleteComment);

// 좋아요 추가
sharedItinerariesRoutes.post('/:shared_itineraries_id/like', likeController.addLike);

// 좋아요 취소
sharedItinerariesRoutes.delete('/:shared_itineraries_id/like', likeController.removeLike);

// 스크랩 추가
sharedItinerariesRoutes.post('/:shared_itineraries_id/scrap', scrapController.addScrap);

// 스크랩 취소
sharedItinerariesRoutes.delete('/:shared_itineraries_id/scrap', scrapController.removeScrap);

module.exports = sharedItinerariesRoutes; // 라우터를 내보냄
