const Itinerary = require('../../models/Itinerary');
const { Op } = require('sequelize');

// 공유된 일정 목록 조회
exports.getSharedItineraries = async (req, res) => {
    const { status, keyword } = req.query;
    try {
        let itineraries;
        const whereCondition = { public_private: 0 };

        if (keyword) {
            whereCondition.name = { [Op.like]: `%${keyword}%` };
        }

        if (status === 'recent') {
            itineraries = await Itinerary.findAll({
                where: whereCondition,
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({ message: "최근 정렬된 여행지 목록", data: itineraries });
        } else if (status === 'popular') {
            itineraries = await Itinerary.findAll({
                where: whereCondition,
                order: [['likenumber', 'DESC']]
            });
            res.status(200).json({ message: "인기 정렬된 여행지 목록", data: itineraries });
        } else {
            res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "목록 조회에 실패했습니다.", error: error.message });
    }
};

// 공유 일정 상세 조회
exports.getSharedItineraryById = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    try {
        const itinerary = await Itinerary.findByPk(shared_itineraries_id);
        if (itinerary) {
            res.status(200).json({ message: `ID가 ${shared_itineraries_id}인 공유 일정`, data: itinerary }); // 템플릿 리터럴 수정
        } else {
            res.status(404).json({ message: "해당 일정을 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "일정 조회에 실패했습니다.", error: error.message });
    }
};

// 특정 일차 일정 조회
exports.getItineraryDay = async (req, res) => {
    const { shared_itineraries_id, day } = req.params;
    try {
        const itineraryDay = await Itinerary.findOne({ where: { id: shared_itineraries_id, day } });
        if (itineraryDay) {
            res.status(200).json({ message: `${day}일차 일정 조회`, data: itineraryDay }); // 템플릿 리터럴 수정
        } else {
            res.status(404).json({ message: "해당 일차 일정을 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "일차 일정 조회에 실패했습니다.", error: error.message });
    }
};