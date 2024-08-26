const express = require("express");
const router = express.Router();

router.post('/account', (req, res) => {
    const { password } = req.body;
});

module.exports = router;


/**
 * @swagger
 * paths:
 *  /mypage/account/:
 *   post:
 *    tags:
 *    - Account
 *    summary: 비밀번호를 통한 본인 확인
 *    description: 사용자가 자신의 비밀번호를 제출하여 본인 확인을 수행합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                description: 사용자 비밀번호
 *                example: 123abc!
 *    responses:
 *     200:
 *      description: 본인 확인 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     401:
 *      description: 본인 확인 실패 (비밀번호 불일치 또는 인증 오류)
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Invalid password
 */




/**
 * @swagger
 * paths:
 *  /mypage/account:
 *   get:
 *    tags:
 *    - Account
 *    summary: 개인정보 조회
 *    description: 사용자가 개인정보를 수정하기 위해 기존 정보를 조회합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 개인정보 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: 사용자 아이디
 *                example: "user123"
 *              name:
 *                type: string
 *                description: 사용자 이름
 *                example: "홍길동"
 *              birthdate:
 *                type: string
 *                description: 사용자 생년월일
 *                example: "1999-03-31"
 *              password:
 *                type: string
 *                description: 사용자 전화번호
 *                example: "010-1111-1111"
 *              email:
 *                type: string
 *                description: 사용자 이메일
 *                example: "user@example.com"
 *              nickname:
 *                type: string
 *                description: 사용자 닉네임
 *                example: "disagree"
 *              profilephoto:
 *                type: string
 *                description: 사용자 프로필 사진 URL 또는 파일 경로
 *                example: "https://example.com/profile.jpg"
 *     401:
 *      description: 인증 실패 (토큰 만료 또는 유효하지 않은 토큰)
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "Invalid or expired token"
 */
