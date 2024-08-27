const express = require('express');
const router = express.Router();

// 공유된 일정 목록 조회
router.get('/shared-itineraries', (req, res) => {
    
});

// 게시글 상세 조회
router.get('/shared-itineraries/:shared_itineraries_id', (req, res) => {
    const { shared_itineraries_id } = req.params;
});

// 댓글 작성
router.post('/shared-itineraries/:shared_itineraries_id/comments', (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id, content } = req.body;
});

// 좋아요 기능
router.post('/shared-itineraries/:shared_itineraries_id/like', (req, res) => {
    const { shared_itineraries_id } = req.params;
});

// 스크랩 기능
router.post('/shared-itineraries/:shared_itineraries_id/scrap', (req, res) => {
    const { shared_itineraries_id } = req.params;
});

module.exports = router;