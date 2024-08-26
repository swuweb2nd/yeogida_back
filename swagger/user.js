/**
 * @swagger
 * paths:
 *  /users/login/:
 *   post:
 *    tags:
 *    - User
 *    summary: 로그인
 *    description: 로그인 메인페이지에 접속(GET)하고, 로그인(POST)한다.
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
 *            type: string
 *            properties:
								id:
 *                type: string
 *                description: 사용자 아이디
 *                example: yeogida24
 *              password:
 *                type: string
 *                description: 사용자 비밀번호
 *                example: swuweb1234*
 *    responses:
 *     200:
 *      description: 로그인성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     401:
 *      description: 아이디 또는 비밀번호가 일치하지 않는 경우
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Invalid password
 */