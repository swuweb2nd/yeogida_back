const express = require('express');
const { Op } = require('sequelize');
const { Itinerary } = require('../models');
const router = express.Router();

// 1. 7일간의 게시물 조회 (인기순 및 최신순)
router.get('/itineraries/recent', async (req, res) => {
    try {
        const { sort } = req.query;  // sort 값을 쿼리로 받음 ('popularity' or 'newest')

        // 현재 날짜에서 7일 전까지의 일정 필터링
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // 정렬 조건 설정
        let order = [];
        if (sort === 'popularity') {
            order = [['likenumber', 'DESC']];  // 좋아요 많은 순
        } else {
            order = [['created_at', 'DESC']];  // 기본은 최신순
        }

        // 7일 이내의 일정 조회
        const itineraries = await Itinerary.findAll({
            where: {
                created_at: {
                    [Op.gte]: sevenDaysAgo  // 7일 이내
                }
            },
            order: order
        });

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve recent itineraries' });
    }
});

// 2. 가장 많이 여행한 도시 Top 5 조회
router.get('/itineraries/top-destinations', async (req, res) => {
    try {
        const topDestinations = await Itinerary.findAll({
            attributes: [
                'destination',
                [sequelize.fn('COUNT', sequelize.col('destination')), 'visit_count']
            ],
            group: 'destination',
            order: [[sequelize.literal('visit_count'), 'DESC']],
            limit: 5
        });

        res.status(200).json(topDestinations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve top destinations' });
    }
});

// 3. 일정 검색 기능 (제목, 목적지, 설명에서 검색)
router.get('/itineraries/search', async (req, res) => {
    try {
        const { query } = req.query;  // 쿼리에서 검색어를 받음

        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        // 검색 조건 설정 (제목, 목적지, 설명에서 일치하는 데이터 검색)
        const itineraries = await Itinerary.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { destination: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            }
        });

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search itineraries' });
    }
});

module.exports = router;
