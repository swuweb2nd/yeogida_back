const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { verifyPassword, fetchInfo, editAccount } = require('../controllers/mypage/account'); 
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');


//마이페이지 접근 시 비밀번호 확인
router.post('/account', isLoggedIn, verifyPassword);

// GET 요청으로 사용자 정보 조회
router.get('/account', isLoggedIn, fetchInfo);

//PUT 요청으로 개인정보 수정
router.put('/account', isLoggedIn, editAccount);

/*
//친구 목록 조회(최신순)
router.get('/friend?status=recent',);

//친구 목록 조회(이름순)
router.get('/friend?status=name',);

//친구 삭제
router.delete('/friend/{friendId}',);

//친구요청 목록 조회
router.get('/friend/friendrequest',);

//친구 요청 승낙
router.post('/friend/friendrequest/accept',);

//친구 요청 거절
router.post('/friend/friendrequest/reject',);

//친구 검색
router.get('/friend?search={friendName}',);

//친구 추가
router.post('/friend',);

//스크랩 폴더 목록 조회
router.get('/scrap',);

//스크랩 폴더 생성
router.post('/scrap/add',);

//스크랩 폴더 삭제
router.delete('/scrap/delete/{folderId}',);

//스크랩 폴더 이름 수정
router.put('/scrap/rename/{folderId}',);

//일정 스크랩 목록 조회
router.get('/scrap/{folderid}',);

//일정 스크랩 삭제
router.delete('/scrap/{folderId}/delete/{scrapId}',);
*/

module.exports = router;
