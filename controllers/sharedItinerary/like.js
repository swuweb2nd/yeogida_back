const Itinerary = require('../../models/Itinerary');

// 좋아요 추가
exports.addLike = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    try {
        const itinerary = await Itinerary.findByPk(shared_itineraries_id);
        if (itinerary) {
            itinerary.likenumber += 1;
            await itinerary.save();
            res.status(201).json({ message: "좋아요 추가 완료", data: itinerary });
        } else {
            res.status(404).json({ message: "해당 일정을 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "좋아요 추가 실패", error: error.message });
    }
};

// 좋아요 취소
exports.removeLike = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    try {
        const itinerary = await Itinerary.findByPk(shared_itineraries_id);
        if (itinerary) {
            itinerary.likenumber = Math.max(0, itinerary.likenumber - 1);
            await itinerary.save();
            res.status(200).json({ message: "좋아요 취소 완료", data: itinerary });
        } else {
            res.status(404).json({ message: "해당 일정을 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "좋아요 취소 실패", error: error.message });
    }
};