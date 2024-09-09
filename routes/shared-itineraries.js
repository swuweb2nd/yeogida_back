const express = require('express');
const router = express.Router();

// 공유된 일정 목록 조회 (최신순/인기순)
router.get('/shared-itineraries', (req, res) => {
    const { status } = req.query;
    res.status(200).json({ message: `${status}으로 정렬된 여행지 목록을 반환합니다.` });
});

// 특정 공유 일정 상세 조회
router.get('/shared-itineraries/:shared_itineraries_id', (req, res) => {
    const { shared_itineraries_id } = req.params;
    res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 공유 일정을 조회합니다.` });
});

// 특정 일차 일정 조회
router.get('/shared-itineraries/:shared_itineraries_id/day/:day', (req, res) => {
    const { shared_itineraries_id, day } = req.params;
    res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 공유 일정의 ${day}일차 일정을 조회합니다.` });
});

// 댓글 작성
router.post('/shared-itineraries/:shared_itineraries_id/comments', (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id, content } = req.body;
    res.status(201).json({ message: `ID가 ${shared_itineraries_id}인 게시글에 댓글을 작성합니다.` });
});

// 댓글 수정
router.put('/shared-itineraries/:shared_itineraries_id/comments', (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id, content } = req.body;
    res.status(201).json({ message: `ID가 ${shared_itineraries_id}인 게시글의 댓글을 수정합니다.` });
});

// 댓글 삭제
router.delete('/shared-itineraries/:shared_itineraries_id/comments', (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id, content } = req.body;
    res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 게시글의 댓글을 삭제합니다.` });
});

// 좋아요 추가
router.post('/shared-itineraries/:shared_itineraries_id/like', (req, res) => {
    const { shared_itineraries_id } = req.params;
    res.status(201).json({ message: `ID가 ${shared_itineraries_id}인 게시글에 좋아요를 추가합니다.` });
});

// 좋아요 취소
router.delete('/shared-itineraries/:shared_itineraries_id/like', (req, res) => {
    const { shared_itineraries_id } = req.params;
    res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 게시글의 좋아요를 취소합니다.` });
});

// 스크랩 추가
router.post('/shared-itineraries/:shared_itineraries_id/scrap', (req, res) => {
    const { shared_itineraries_id } = req.params;
    res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 게시글을 스크랩합니다.` });
});

// 스크랩 취소
router.delete('/shared-itineraries/:shared_itineraries_id/scrap', (req, res) => {
    const { shared_itineraries_id } = req.params;
    res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 게시글의 스크랩을 취소합니다.` });
});

module.exports = router;