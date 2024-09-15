import express from 'express';
import {sharedItinerary} from '../controllers/sharedItineraryController';

const sharedItineraryRoutes = express.Router();

// 공유된 일정 목록 조회 (최신순/인기순)
sharedItineraryRoutes.get('/', sharedItinerary.getsharedItineraries);

// 특정 공유 일정 상세 조회
sharedItineraryRoutes.get('/:shared_itineraries_id', sharedItinerary.getSharedItineraryById);

// 특정 일차 일정 조회
sharedItineraryRoutes.get('/:shared_itineraries_id/day/:day', sharedItinerary.getItineraryDay);

// 댓글 작성
sharedItineraryRoutes.post('/:shared_itineraries_id/comments', sharedItinerary.createComment);

// 댓글 수정
sharedItineraryRoutes.put('/:shared_itineraries_id/comments', sharedItinerary.updateComment);

// 댓글 삭제
sharedItineraryRoutes.delete('/:shared_itineraries_id/comments', sharedItinerary.deleteComment);

// 좋아요 추가
sharedItineraryRoutes.post('/:shared_itineraries_id/like', sharedItinerary.addLike);

// 좋아요 취소
sharedItineraryRoutes.delete('/:shared_itineraries_id/like', sharedItinerary.removeLike);

// 스크랩 추가
sharedItineraryRoutes.post('/:shared_itineraries_id/scrap', sharedItinerary.addScrap);

// 스크랩 취소
sharedItineraryRoutes.delete('/:shared_itineraries_id/scrap', sharedItinerary.removeScrap);

export {sharedItineraryRoutes};