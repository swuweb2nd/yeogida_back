const express = require('express');
const sharedItinerary = require('../controllers/sharedItinerary/sharedItinerary');
const commentController = require('../controllers/sharedItinerary/comment');
const likeController = require('../controllers/sharedItinerary/like');
const scrapController = require('../controllers/sharedItinerary/scrap');

const sharedItinerariesRoutes = express.Router();
const { verifyToken} = require('../middlewares');

// 공유된 일정 목록 조회 (최신순/인기순)
sharedItinerariesRoutes.get('/', sharedItinerary.getSharedItineraries);

// 특정 공유 일정 상세 조회
sharedItinerariesRoutes.get('/:shared_itineraries_id', verifyToken, sharedItinerary.getSharedItineraryById);

// 특정 일차 일정 조회
sharedItinerariesRoutes.get('/:shared_itineraries_id/day/:day', verifyToken,sharedItinerary.getItineraryDay);

// 댓글 작성
sharedItinerariesRoutes.post('/:shared_itineraries_id/comments', verifyToken,commentController.createComment);

// 댓글 수정
sharedItinerariesRoutes.put('/:shared_itineraries_id/comments', verifyToken,commentController.updateComment);

// 댓글 삭제
sharedItinerariesRoutes.delete('/:shared_itineraries_id/comments', verifyToken,commentController.deleteComment);

// 좋아요 추가
sharedItinerariesRoutes.post('/:shared_itineraries_id/like', verifyToken,likeController.addLike);

// 좋아요 취소
sharedItinerariesRoutes.delete('/:shared_itineraries_id/like', verifyToken,likeController.removeLike);

// 스크랩 추가
sharedItinerariesRoutes.post('/:shared_itineraries_id/scrap', verifyToken,scrapController.addScrap);

// 스크랩 취소
sharedItinerariesRoutes.delete('/:shared_itineraries_id/scrap', verifyToken,scrapController.removeScrap);

module.exports = sharedItinerariesRoutes;