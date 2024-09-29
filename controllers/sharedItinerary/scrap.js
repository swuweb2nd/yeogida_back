const Scrap = require('../models/scrap');

// 스크랩 추가
exports.addScrap = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { folder_id } = req.body;
    try {
        await Scrap.create({ sharedItineraryId: shared_itineraries_id, folderId: folder_id });
        res.status(200).json({ message: "스크랩 추가 완료" });
    } catch (error) {
        res.status(500).json({ message: "스크랩 추가 실패", error: error.message });
    }
};

// 스크랩 취소
exports.removeScrap = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { folder_id } = req.body;
    try {
        await Scrap.destroy({ where: { sharedItineraryId: shared_itineraries_id, folderId: folder_id } });
        res.status(200).json({ message: "스크랩 취소 완료" });
    } catch (error) {
        res.status(500).json({ message: "스크랩 취소 실패", error: error.message });
    }
};
