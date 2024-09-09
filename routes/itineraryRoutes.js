const express = require('express');
const router = express.Router();
const { Itinerary, Sharer } = require('../models'); // Sequelize 모델 import
const { Op } = require('sequelize');

// 전체 여행일정을 조회 (8/27 필터링 포함: 내가 만든 일정, 공유된 일정, 타인으로부터 받은 공유 일정, 목적지, 날짜, 최신순, 오래된순)
router.get('/', async (req, res) => {
    try {
        const { user_id, public_private, destination, startdate, enddate, sort, type } = req.query;
        const filters = {};

        // 조건에 따른 필터링 설정
        if (user_id) {
            if (type === 'mine') {
                // 내가 만든 일정
                filters.user_id = user_id;
            } else if (type === 'shared') {
                // 타인으로부터 공유받은 일정
                filters['$Sharer.friend_id2$'] = user_id;
            } else {
                // 전체 (내가 만든 일정 + 공유받은 일정)
                filters[Op.or] = [
                    { user_id },  // 내가 만든 일정
                    { '$Sharer.friend_id2$': user_id } // 타인으로부터 공유받은 일정
                ];
            }
        }

        // 공개 여부 필터링
        if (public_private !== undefined) {
            filters.public_private = public_private === 'true';
        }

        // 목적지 필터링
        if (destination) {
            filters.destination = destination;
        }

        // 시작 날짜 필터링
        if (startdate) {
            filters.startdate = {
                [Op.gte]: startdate,
            };
        }

        // 종료 날짜 필터링
        if (enddate) {
            filters.enddate = {
                [Op.lte]: enddate,
            };
        }
        // 정렬 기준 설정
        let order = [];
        switch (sort) {
            case 'newest':
                order = [['created_at', 'DESC']]; // 최신순
                break;
            case 'oldest':
                order = [['created_at', 'ASC']]; // 오래된 순
                break;
            default:
                order = [['created_at', 'DESC']]; // 기본값은 최신순
                break;
        }

        // 일정 조회, Sharer 테이블과 조인
        const itineraries = await Itinerary.findAll({
            where: filters,
            include: [
                {
                    model: Sharer,
                    required: false,
                }
            ],
            order: order
        });

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
