const Itinerary = require('../models/Itinerary');
const Scrap = require('../models/scrap');
const Comment = require('../models/comment');

// 공유된 일정 목록 조회
exports.getSharedItineraries = async (req, res) => {
    const {status, keyword} = req.query; // keyword 추가
    try {
        let itineraries;
        const whereCondition = { public_private: 0 }; // 공개된 일정만

        // keyword가 있을 경우 제목에서 검색어 필터링 추가
        if (keyword) {
            whereCondition.name = { [Op.like]: `%${keyword}%` }; // 일정 제목에서 검색어 찾기
        }

        if (status === 'recent') {
            // db에서 최신순으로 일정 가져오기
            itineraries = await Itinerary.findAll({
                where: whereCondition,
                order: [['createdAt', 'DESC']] // 최신순으로 정렬
            });
            res.status(200).json({
                message: "최근 정렬된 여행지 목록을 반환합니다.",
                data: itineraries
            });
        } else if (status === 'popular') {
            // db에서 인기순으로 일정 가져오기
            itineraries = await Itinerary.findAll({
                where: whereCondition,
                order: [['likenumber', 'DESC']] // 인기순으로 정렬
            });
            res.status(200).json({
                message: "인기 정렬된 여행지 목록을 반환합니다.",
                data: itineraries
            });
        } else {
            res.status(404).json({
                message: "게시글을 찾을 수 없습니다."
            });
        }
    } catch (error) {
        res.status(500).json({message: "목록 조회에 실패했습니다.", error: error.message});
    }
};



// 공유 일정 상세 조회
exports.getSharedItineraryById = async (req, res) => {
    const {shared_itineraries_id} = req.params;
    try {
        const itinerary = await Itinerary.findByPk(shared_itineraries_id);
        if (itinerary) {
            res.status(200).json({
                message: `ID가 ${shared_itineraries_id}인 공유 일정을 조회합니다.`,
                data: itinerary
            });
        } else {
            res.status(404).json({
                message: "해당 일정을 찾을 수 없습니다."
            });
        }
    } catch (error) {
        res.status(500).json({message: "일정 조회에 실패했습니다.", error: error.message});
    }
};

// 특정 일차 일정 조회
exports.getItineraryDay = async (req, res) => {
    const {shared_itineraries_id, day} = req.params;
    try {
        const itineraryDay = await Itinerary.findOne({where: {id: shared_itineraries_id, day}});
        if (itineraryDay) {
            res.status(200).json({
                message: `ID가 ${shared_itineraries_id}인 공유 일정의 ${day}일차 일정을 조회합니다.`,
                data: itineraryDay
            });
        } else {
            res.status(404).json({
                message: "해당 일차 일정을 찾을 수 없습니다."
            });
        }
    } catch (error) {
        res.status(500).json({message: "일차 일정 조회에 실패했습니다.", error: error.message});
    }
};

// 댓글 작성
exports.createComment = async (req, res) => {
    const {shared_itineraries_id} = req.params;
    const {user_id, content} = req.body;
    try {
        const newComment = await Comment.create({sharedItineraryId: shared_itineraries_id, userId: user_id, content});
        res.status(201).json({
            message: `ID가 ${shared_itineraries_id}인 게시글에 댓글을 작성합니다.`,
            data: newComment
        });
    } catch (error) {
        res.status(500).json({message: "댓글 작성에 실패했습니다.", error: error.message});
    }
};

// 댓글 수정
exports.updateComment = async (req, res) => {
    const {shared_itineraries_id} = req.params;
    const {user_id, content} = req.body;
    try {
        const updatedComment = await Comment.update({ content}, {where: {sharedItineraryId: shared_itineraries_id, userId: user_id}});
        res.status(200).json({
            message: `ID가 ${shared_itineraries_id}인 게시글의 댓글을 수정합니다.`,
            data: updatedComment
        });
    } catch (error) {
        res.status(500).json({ message: "댓글 수정에 실패했습니다.", error: error.message});
    }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
    const {shared_itineraries_id} = req.params;
    const {user_id} = req.body;
    try {
        await Comment.destroy({ where: { sharedItineraryId: shared_itineraries_id, userId: user_id}});
        res.status(200).json({
            message: `ID가 ${shared_itineraries_id}인 게시글의 댓글을 삭제합니다.`,
        });
    } catch (error) {
        res.status(500).json({ message: "댓글 삭제에 실패했습니다.", error: error.message});
    }
};

// 좋아요 추가
exports.addLike = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    try {
        const itinerary = await Itinerary.findByPk(shared_itineraries_id);
        if (itinerary) {
            itinerary.likenumber += 1; // 좋아요 수 증가
            await itinerary.save(); // 변경사항 저장
            res.status(201).json({
                message: `ID가 ${shared_itineraries_id}인 공유 일정 게시글에 좋아요를 추가합니다.`,
                data: itinerary // 업데이트된 데이터 반환
            });
        } else {
            res.status(404).json({
                message: "해당 일정을 찾을 수 없습니다."
            });
        }
    } catch (error) {
        res.status(500).json({ message: "좋아요 추가에 실패했습니다.", error: error.message });
    }
};

// 좋아요 취소
exports.removeLike = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    try {
        const itinerary = await Itinerary.findByPk(shared_itineraries_id);
        if (itinerary) {
            itinerary.likenumber = Math.max(0, itinerary.likenumber - 1); // 좋아요 수 감소
            await itinerary.save(); // 변경사항 저장
            res.status(200).json({
                message: `ID가 ${shared_itineraries_id}인 공유 일정 게시글에 대한 좋아요를 취소합니다.`,
                data: itinerary // 업데이트된 데이터 반환
            });
        } else {
            res.status(404).json({
                message: "해당 일정을 찾을 수 없습니다."
            });
        }
    } catch (error) {
        res.status(500).json({ message: "좋아요 취소에 실패했습니다.", error: error.message });
    }
};


// 스크랩 추가
exports.addScrap = async (req, res) => {
    const {shared_itineraries_id} = req.params;
    const {folder_id} = req.body;
    try {
        await Scrap.create({ sharedItineraryId: shared_itineraries_id, folderId: folder_id });
        res.status(200).json({
            message: "스크랩이 성공적으로 저장되었습니다.",
        });
    } catch (error) {
        res.status(500).json({message: "스크랩 추가에 실패했습니다.", error: error.message});
    }
};

// 스크랩 취소
exports.removeScrap = async (req, res) => {
    const {shared_itineraries_id} = req.params;
    const {folder_id} = req.body;
    try {
        await Scrap.destroy({where:{sharedItineraryId: shared_itineraries_id, folderId: folder_id}});
        res.status(200).json({
            message: "스크랩이 성공적으로 취소되었습니다.",
        });
    } catch (error) {
        res.status(500).json({message: "스크랩 취소에 실패했습니다.", error: error.message});
    }
};
