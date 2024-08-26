const express = require('express');
const router = express.Router();
const { Itinerary } = require('../models'); // Sequelize 모델 import

// 전체 여행일정 조회
router.get('/', async (req, res) => {
    try {
        const itineraries = await Itinerary.findAll();
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve itineraries' });
    }
});

// 새로운 여행일정 생성
router.post('/', async (req, res) => {
    try {
        const itinerary = await Itinerary.create(req.body);
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create itinerary' });
    }
});

// 특정 여행일정 조회
router.get('/:itinerary_id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findByPk(req.params.itinerary_id);
        if (itinerary) {
            res.status(200).json(itinerary);
        } else {
            res.status(404).json({ error: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve itinerary' });
    }
});

// 특정 여행일정 수정
router.put('/:itinerary_id', async (req, res) => {
    try {
        const [updated] = await Itinerary.update(req.body, { where: { itinerary_id: req.params.itinerary_id } });
        if (updated) {
            const updatedItinerary = await Itinerary.findByPk(req.params.itinerary_id);
            res.status(200).json(updatedItinerary);
        } else {
            res.status(404).json({ error: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update itinerary' });
    }
});

// 특정 여행일정 삭제
router.delete('/:itinerary_id', async (req, res) => {
    try {
        const deleted = await Itinerary.destroy({ where: { itinerary_id: req.params.itinerary_id } });
        if (deleted) {
            res.status(204).send();  // No Content, 메시지 없음
        } else {
            res.status(404).json({ error: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete itinerary' });
    }
});

module.exports = router;
