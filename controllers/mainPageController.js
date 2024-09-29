const { Op } = require('sequelize');
const { Itinerary } = require('../models');

// 7일간의 게시물 조회 (인기순 및 최신순)
exports.getRecentItineraries = async (req, res) => {
    try {
        const { sort } = req.query;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        let order = [];
        if (sort === 'popularity') {
            order = [['likenumber', 'DESC']];
        } else {
            order = [['created_at', 'DESC']];
        }

        const itineraries = await Itinerary.findAll({
            where: {
                created_at: {
                    [Op.gte]: sevenDaysAgo
                }
            },
            order: order
        });

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve recent itineraries' });
    }
};

// 가장 많이 여행한 도시 Top 5 조회
exports.getTopDestinations = async (req, res) => {
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
};

// 일정 검색 기능 (제목, 목적지, 설명에서 검색)
exports.searchItineraries = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

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
};
