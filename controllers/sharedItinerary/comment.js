const Comment = require('../../models/comment');

// 댓글 작성
exports.createComment = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id, content } = req.body;
    try {
        const newComment = await Comment.create({ itinerary_id: shared_itineraries_id, user_id: user_id, comment_contents: content });
        res.status(201).json({ message: "댓글 작성 완료", data: newComment });
    } catch (error) {
        res.status(500).json({ message: "댓글 작성 실패", error: error.message });
    }
};

// 댓글 수정
exports.updateComment = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id, content } = req.body;
    try {
        const updatedComment = await Comment.update(
            { comment_contents: content },
            { where: { itinerary_id: shared_itineraries_id, user_id: user_id } }
        );
        res.status(200).json({ message: "댓글 수정 완료", data: updatedComment });
    } catch (error) {
        res.status(500).json({ message: "댓글 수정 실패", error: error.message });
    }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
    const { shared_itineraries_id } = req.params;
    const { user_id } = req.body;
    try {
        await Comment.destroy({ where: { itinerary_id: shared_itineraries_id, user_id: user_id } });
        res.status(200).json({ message: "댓글 삭제 완료" });
    } catch (error) {
        res.status(500).json({ message: "댓글 삭제 실패", error: error.message });
    }
};