const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const FriendList = require('../models/friendList'); // FriendList 모델 불러오기

// 친구 목록 조회 (recent, name)
exports.fetchFriendList = async (req, res) => {
    try {
      const { sortBy } = req.query; // 요청에서 정렬 기준을 가져옴 ('recent' 또는 'name')
      
      // 기본 정렬은 최신순(recent)
      let order = [['add_date', 'DESC']];
  
      if (sortBy === 'name') {
        order = [[User, 'name', 'ASC']]; // Users 테이블과 연관된 'name' 컬럼으로 정렬
      }
  
      // FriendList에서 친구 목록 조회 (Users 테이블과 조인), status가 0인 경우만 추출
      const friendList = await FriendList.findAll({
        where: {
          status: 1// status가 0인 데이터만 추출
        },
        include: [{
          model: User,
          attributes: ['name'], // Users 테이블에서 가져올 컬럼 (name)
          required: true
        }],
        order: order
      });
  
      // 조회된 데이터를 응답 형식에 맞게 변환
      const formattedFriendList = friendList.map(request => ({
        friendName: request.User.name, // User 테이블의 이름을 friendName으로 매핑
        friendId: request.friend_id,
        userId: request.user_id,
        addDate: request.add_date.toISOString().split('T')[0] // 날짜 형식 변환 (YYYY-MM-DD)
      }));
  
      // 응답 데이터 작성
      res.status(200).json({
        message: "친구 목록 조회가 정상적으로 이루어졌습니다.",
        data: {
          friendList: formattedFriendList
        }
      });
  
    } catch (error) {
      console.error('Error fetching friend list:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


// 친구 삭제 (URL에서 friendId 받아오기)
exports.deleteFriend = async (req, res) => {
    try {
      const { friendId } = req.params; // URL 경로에서 friendId를 받아옴
  
      // friendId에 해당하는 데이터 삭제
      const updatedFriend = await FriendList.update(
        { status: 0 }, // status를 0으로 변경하여 친구 삭제 처리
        { where: { friend_id: friendId } }
      );
  
      if (deletedFriend) {
        // 삭제 성공 시
        res.status(200).json({
          message: "친구가 성공적으로 삭제되었습니다."
        });
      } else {
        // friendId가 존재하지 않는 경우
        res.status(404).json({
          message: "해당 친구를 찾을 수 없습니다."
        });
      }
    } catch (error) {
      console.error('Error deleting friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

//친구 요청 목록 회
exports.fetchFriendRequestList = async (req, res) => {
  try {
    // FriendList에서 status가 1인 친구 요청 목록을 조회하면서, User 테이블의 이름도 함께 가져옴
    const friendRequests = await FriendList.findAll({
      where: {
        status: 2
      },
      attributes: ['friend_id', 'user_id', 'add_date'],
      include: [
        {
          model: User,
          as: 'user', // 연결된 유저의 정보를 가져옴
          attributes: ['name'] // 유저의 이름만 가져옴
        }
      ],
      raw: true
    });

    // 조회된 친구 목록이 없을 경우
    if (friendRequests.length === 0) {
      return res.status(200).json({
        message: "친구 요청이 없습니다.",
        data: {
          friendList: []
        }
      });
    }

    // 조회된 결과를 원하는 형식으로 변환
    const formattedFriendRequests = friendRequests.map(request => ({
      friendName: request.User.name, // User 테이블에서 가져온 이름
      friendId: request.friend_id,
      userId: request.user_id,
      requestDate: request.add_date
    }));

    // 정상적인 응답 전송
    return res.status(200).json({
      message: "친구 목록 조회가 정상적으로 이루어졌습니다.",
      data: {
        friendList: formattedFriendRequests
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "서버 오류가 발생했습니다."
    });
  }
};


  

// 친구 요청 승낙
exports.friendAccept = async (req, res) => {
    try {
      const { friendId } = req.body; // 프론트에서 전달된 friendId
  
      // friendId에 해당하는 친구 요청의 status를 1에서 0으로 업데이트 (승낙)
      const updatedFriend = await FriendList.update(
        { status: 1 }, // status를 0으로 변경 (승낙 처리)
        { where: { friend_id: friendId } }
      );
  
      if (updatedFriend[0] === 0) {
        // friendId에 해당하는 친구 요청이 없을 경우
        return res.status(404).json({
          message: "해당 친구 요청을 찾을 수 없습니다."
        });
      }
  
      // 성공적으로 업데이트된 경우
      res.status(200).json({
        message: "친구 요청이 성공적으로 승낙되었습니다."
      });
  
    } catch (error) {
      console.error('Error accepting friend request:', error);
      res.status(500).json({
        message: "서버 오류가 발생했습니다."
      });
    }
  };
  
//친구 요청 거절
exports.friendReject = async (req, res) => {
  try {
    const { friendId } = req.body; // 프론트에서 전달된 friendId

    // friendId에 해당하는 친구 요청의 status를 3으로 업데이트 (거절)
    const updatedFriend = await FriendList.update(
      { status: 3 }, // status를 3으로 변경=  거절
      { where: { friend_id: friendId } }
    );

    if (updatedFriend[0] === 0) {
      // friendId에 해당하는 친구 요청이 없을 경우
      return res.status(404).json({
        message: "해당 친구 요청을 찾을 수 없습니다."
      });
    }

    // 성공적으로 업데이트된 경우
    res.status(200).json({
      message: "친구 요청이 성공적으로 거절되었습니다."
    });

  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다."
    });
  }
};

const FriendList = require('../models/friendList'); // friendList 모델
const User = require('../models/user'); // user 모델

// 친구 추가 요청 보내기
exports.friendRequest = async (req, res) => {
  try {
    const { userId } = req.user; // 요청을 보낸 사용자의 ID (로그인된 사용자)
    const { friendUserId } = req.body; // 프론트에서 전송된 친구의 userId (친구 요청을 받은 사용자 ID)

    // 1. 친구 요청을 보낸 사용자의 friendList에 친구 정보 추가 (status = 2)
    const requestSent = await FriendList.create({
      user_id: userId,  // 로그인한 사용자의 ID (친구 요청을 보낸 사람)
      friend_user_id: friendUserId,  // 친구의 userId (친구 요청을 받은 사람)
      status: 2,  // 친구 요청을 보낸 상태
      request_date: new Date()  // 현재 날짜
    });

    // 2. 친구 요청을 받은 사용자의 friendList에 친구 정보 추가 (status = 1)
    const requestReceived = await FriendList.create({
      user_id: friendUserId,  // 친구의 userId (친구 요청을 받은 사람)
      friend_user_id: userId,  // 로그인한 사용자의 ID (친구 요청을 보낸 사람)
      status: 1,  // 친구 요청을 받은 상태
      add_date: new Date()  // 현재 날짜
    });

    // 요청이 성공적으로 처리되면 응답
    res.status(200).json({
      message: "친구 요청이 성공적으로 전송되었습니다."
    });

  } catch (error) {
    console.error('친구 요청 전송 중 오류 발생:', error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다."
    });
  }
};



//친구 검색
exports.searchFriend


