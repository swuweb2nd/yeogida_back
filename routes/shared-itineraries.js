const express = require('express');
const { Itinerary, User } = require('../models');
const router = express.Router();

// 여행 일정 목록 조회 (공개된 일정만)
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.findAll({
      where: { public_private: 0 },
      include: [{ model: User, attributes: ['nickname', 'profileImage'] }]//프로필1이미지 추가
    });

    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '여행 일정을 불러오는 데 실패했습니다' });
  }
});

// 여행 일정의 상세 조회
router.get('/:id', async (req, res) => {
  const itinerary_id = req.params.id;

  try {
    const itinerary = await Itinerary.findOne({
      where: { id: itinerary_id, public_private: 0 },
      include: [{ model: User, attributes: ['nickname', 'profileImage'] }]
    });

    if (itinerary) {
      res.json(itinerary);
    } else {
      res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '게시글을 불러오는 데 실패했습니다.' });
  }
});

module.exports = router;