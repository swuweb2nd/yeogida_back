const Scrap = require('../../models/scrap');

// 스크랩 추가
exports.addScrap = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { scrapfolder_id } = req.body; // folder_id 대신 scrapfolder_id로 변경
    try {
        await Scrap.create({ scraptype_id: shared_itineraries_id, scrapfolder_id: scrapfolder_id });
        res.status(200).json({ message: "스크랩 추가 완료" });
    } catch (error) {
        res.status(500).json({ message: "스크랩 추가 실패", error: error.message });
    }
};

// 스크랩 취소
exports.removeScrap = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { scrapfolder_id } = req.body; // folder_id 대신 scrapfolder_id로 변경
    try {
        await Scrap.destroy({ where: { scraptype_id: shared_itineraries_id, scrapfolder_id: scrapfolder_id } });
        res.status(200).json({ message: "스크랩 취소 완료" });
    } catch (error) {
        res.status(500).json({ message: "스크랩 취소 실패", error: error.message });
    }
};