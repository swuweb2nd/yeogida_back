const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.verifyPassword = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You need to log in to access this resource." });
    }

    const { password } = req.body;
    const userId = req.user.id;  // passport에서 제공하는 사용자 정보

    try {
        // DB에서 사용자 정보 가져오기
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // 비밀번호가 일치할 경우
            res.status(200).json({ message: "Password is correct, access granted." });
        } else {
            // 비밀번호가 일치하지 않을 경우
            res.status(401).json({ message: "Incorrect password, access denied." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};




// GET 요청으로 사용자 정보 조회
exports.fetchInfo = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You need to log in to access this resource." });
    }

    const userId = req.user.id;  // passport에서 제공하는 사용자 정보

    try {
        // DB에서 사용자 정보 가져오기
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 사용자 정보 전송
        res.status(200).json({
            message: "일정 목록 조회가 정상적으로 이루어졌습니다.",
            data: {
                id: user.user_id,
                password: user.password,  // 일반적으로 비밀번호는 보내지 않지만, 예시로 주어진 형식에 포함되어 있습니다.
                name: user.name,
                email: user.email,
                phone: user.phone,
                nickname: user.nickname,
                birth: user.birth,
                profileImg: user.profileImg
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// 사용자 정보 수정
exports.editAccount = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You need to log in to access this resource." });
    }

    const userId = req.user.id;  // passport에서 제공하는 사용자 정보
    const { password, email, nickname, profileImg } = req.body;

    try {
        // DB에서 사용자 정보 가져오기
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 새 비밀번호가 있으면 해시화 처리
        let updatedPassword = user.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);  // 비밀번호를 해시화
        }

        // 사용자 정보 업데이트
        await User.update(
            {
                password: updatedPassword,
                email: email || user.email,
                nickname: nickname || user.nickname,
                profileImg: profileImg || user.profileImg
            },
            { where: { user_id: userId } }
        );

        // 업데이트 성공
        res.status(200).json({
            message: "Account information updated successfully",
            data: {
                id: user.user_id,
                email: email || user.email,
                nickname: nickname || user.nickname,
                profileImg: profileImg || user.profileImg
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

