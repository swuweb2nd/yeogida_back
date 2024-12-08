const { Itinerary, Sharer } = require('../models'); // Sequelize 모델 import
const { Op } = require('sequelize');

// 전체 여행일정을 조회
exports.getItineraries = async (req, res) => {
    try {
        const { user_id, public_private, destination, startdate, enddate, sort, type } = req.query;
        const filters = {};

        // 조건에 따른 필터링 설정
        if (user_id) {
            if (type === 'mine') {
                filters.user_id = user_id;
            } else if (type === 'shared') {
                filters['$Sharer.friend_id2$'] = user_id;
            } else {
                filters[Op.or] = [
                    { user_id }, 
                    { '$Sharer.friend_id2$': user_id }
                ];
            }
        }

        if (public_private !== undefined) {
            filters.public_private = public_private === 'true';
        }

        if (destination) {
            filters.destination = destination;
        }

        if (startdate) {
            filters.startdate = { [Op.gte]: startdate };
        }

        if (enddate) {
            filters.enddate = { [Op.lte]: enddate };
        }

        let order = [];
        switch (sort) {
            case 'newest':
                order = [['created_at', 'DESC']];
                break;
            case 'oldest':
                order = [['created_at', 'ASC']];
                break;
            default:
                order = [['created_at', 'DESC']];
                break;
        }

        const itineraries = await Itinerary.findAll({
            where: filters,
            include: [{ model: Sharer, required: false }],
            order: order
        });

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve itineraries' });
    }
};

// 새로운 여행일정 생성
exports.createItinerary = async (req, res) => {
    try {
        const { title, startdate, enddate, destination, public_private, description, thumbnail } = req.body;

        // 이미지 URL이 없다면 기본 이미지 사용
        const finalThumbnail = thumbnail || 'https://example.com/default-thumbnail.jpg'; // 기본 이미지 URL

        console.log('🛠️ Creating itinerary:', req.body);

        const itinerary = await Itinerary.create({
            user_id: req.user.id, // JWT 토큰으로부터 가져오는 사용자 ID
            title,
            startdate,
            enddate,
            destination,
            public_private,
            description,
            thumbnail: finalThumbnail, // 이미지 URL을 저장
        });

        res.status(201).json(itinerary);
    } catch (error) {
        console.error('❌ Failed to create itinerary:', error.message);
        res.status(500).json({ error: `Failed to create itinerary: ${error.message}` });
    }
};
/*
exports.createItinerary = async (req, res) => {
    try {
        const { title, startdate, enddate, destination, public_private, description, thumbnail } = req.body;

        console.log('🛠️ Creating itinerary:', req.body);

        const itinerary = await Itinerary.create({
            user_id: req.user.id, // JWT 토큰으로부터 가져오는 사용자 ID
            title,
            startdate,
            enddate,
            destination,
            public_private,
            description,
            thumbnail, // 클라이언트에서 전달받은 이미지 URL 저장
        });

        res.status(201).json(itinerary);
    } catch (error) {
        console.error('❌ Failed to create itinerary:', error.message);
        res.status(500).json({ error: `Failed to create itinerary: ${error.message}` });
    }
};
*/

/*
exports.createItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.create(req.body);
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create itinerary' });
    }
};
*/

// 특정 여행일정 조회
exports.getItineraryById = async (req, res) => {
    try {
        console.log('🛠️ Retrieving itinerary by ID:', req.params.itinerary_id);
        const itinerary = await Itinerary.findByPk(req.params.itinerary_id);
        if (itinerary) {
            res.status(200).json(itinerary);
        } else {
            res.status(404).json({ error: 'Itinerary not found' });
        }
    } catch (error) {
        console.error('❌ Error retrieving itinerary by ID:', error.message);
        res.status(500).json({ error: 'Failed to retrieve itinerary' });
    }
};
/*
exports.getItineraryById = async (req, res) => {
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
};
*/

// 특정 여행일정 수정
exports.updateItinerary = async (req, res) => {
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
};

// 특정 여행일정 삭제
exports.deleteItinerary = async (req, res) => {
    try {
        const deleted = await Itinerary.destroy({ where: { itinerary_id: req.params.itinerary_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Itinerary not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete itinerary' });
    }
};
