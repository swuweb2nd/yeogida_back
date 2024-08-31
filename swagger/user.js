//로그인
/**
 * @swagger
 * paths:
 *  /users/login:
 *   post:
 *    tags:
 *    - User
 *    summary: 로그인 
 *    description: 사용자가 로그인합니다.
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
 *				id:
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

//로그인 페이지 조회
/**
 * @swagger
 * paths:
 *  /users/login:
 *   get:
 *    tags:
 *    - User
 *    summary: 로그인 페이지 조회
 *    description: 로그인 메인페이지를 조회합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 로그인 페이지 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     401:
 *      description: 클라이언트 요청 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Client Error
 */

//회원가입
/**
 * @swagger
 * paths:
 *  /users/signup/:
 *   post:
 *    tags:
 *    - User
 *    summary: 회원가입 
 *    description: 사용자가 회원가입 합니다.
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
 *				id:
 *                type: string
 *                description: 사용자 아이디
 *                example: yeogida24
 *              password:
 *                type: string
 *                description: 사용자 비밀번호
 *                example: swuweb1234*
 *              passwordCheck:
 *                type: string
 *                description: 사용자 비밀번호 재확인
 *                example: swuweb1234*
 *              name:
 *                type: string
 *                description: 이름
 *                example: 김슈니
 *              email:
 *                type: string
 *                description: 이메일 주소 
 *                example: swuni123@gmail.com
 *              phonenumber:
 *                type: string
 *                description: 전화번호 
 *                example: 01020248020
 *              nickname:
 *                type: string
 *                description: 닉네임 
 *                example: 슈니1234
 *              birth :
 *                type: string
 *                description: 생년월일
 *                example: 2003-01-01
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
 *     409:
 *      description: 이미 가입된 회원정보인 경우
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 이미 존재하는 회원정보 입니다.
 *     400:
 *      description: 비밀번호가 일치하지 않는 경우 
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 비밀번호가 일치하지 않습니다.
 */

//회원가입 페이지 조회
/**
 * @swagger
 * paths:
 *  /users/signup:
 *   get:
 *    tags:
 *    - User
 *    summary: 회원가입 페이지 조회
 *    description: 회원가입 메인페이지를 조회합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 회원가입 페이지 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     400:
 *      description: 클라이언트 요청 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Client Error
 */

//로그아웃
/**
 * @swagger
 * paths:
 *  /users/logout:
 *   post:
 *    tags:
 *    - User
 *    summary: 로그아웃 
 *    description: 사용자가 로그아웃 합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 로그아웃 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     400:
 *      description: 클라이언트 요청 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Bad Request
 */

//아이디 찾기
/**
 * @swagger
 * paths:
 *  /users/find/id:
 *   post:
 *    tags:
 *    - User
 *    summary: 아이디 찾기 
 *    description: 사용자가 아이디를 찾습니다.
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
 *				name:
 *                type: string
 *                description: 이름 
 *                example: 김슈니 
 *              email:
 *                type: string
 *                description: 이메일 
 *                example: swuni123@gmail.com
 *              phonenumber:
 *                type: string
 *                description: 전화번호 
 *                example: 01020240820
 *    responses:
 *     200:
 *      description: 아이디 찾기 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     404:
 *      description: 입력받은 정보 중 하나라도 DB에 없는 경우
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 해당하는 회원정보가 없습니다.
 */

//아이디 찾기 페이지 조회
/**
 * @swagger
 * paths:
 *  /users/find/id:
 *   get:
 *    tags:
 *    - User
 *    summary: 아이디 찾기 페이지 조회
 *    description: 아이디 찾기 페이지를 조회합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *
 *    responses:
 *     200:
 *      description: 아이디 찾기 페이지 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     400:
 *      description: 입력받은 정보 중 하나라도 DB에 없는 경우
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 클라이언트 오류
 */

//아이디 찾기 성공페이지 조회
/**
 * @swagger
 * paths:
 *  /users/find/id/success:
 *   get:
 *    tags:
 *    - User
 *    summary: 아이디 찾기 성공페이지 조회
 *    description: 아이디를 찾은 후 사용자에게 아이디를 보여줍니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *
 *    responses:
 *     200:
 *      description: 아이디 찾기 성공페이지 조회성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *				id:
 *                type: string
 *                description: 사용자 아이디 
 *                example: 슈니1234
 *              message:
 *                type: string
 *                example: 아이디 찾기 성공
 *     400:
 *      description: 클라이언트 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 클라이언트 오류
 */

//비밀번호 찾기
/**
 * @swagger
 * paths:
 *  /users/find/pw:
 *   post:
 *    tags:
 *    - User
 *    summary: 비밀번호 찾기 
 *    description: 사용자가 비밀번호를 찾습니다.
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
 *				name:
 *                type: string
 *                description: 이름 
 *                example: 김슈니 
 *              id:
 *                type: string
 *                description: 이메일 
 *                example: swuni123@gmail.com
 *              birth:
 *                type: string
 *                description: 생년월일 
 *                example: 2003-01-01 
 *              phonenumber:
 *                type: string
 *                description: 전화번호 
 *                example: 01020240820
 *    responses:
 *     200:
 *      description: 비밀번호 찾기 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     404:
 *      description: 입력받은 정보 중 하나라도 DB에 없는 경우
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 해당하는 회원정보가 없습니다.
 */

//비밀번호 찾기 페이지 조회
/**
 * @swagger
 * paths:
 *  /users/find/pw:
 *   get:
 *    tags:
 *    - User
 *    summary: 비밀번호찾기 페이지 조회
 *    description: 비밀번호찾기 메인페이지를 조회합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 비밀번호찾기 페이지 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     400:
 *      description: 클라이언트 요청 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Client Error
 */

//비밀번호 재설정 페이지 링크를 메일로 전송하기


//비밀번호 재설정 페이지 조회
/**
 * @swagger
 * paths:
 *  /users/pw-reset/${token}:
 *   get:
 *    tags:
 *    - User
 *    summary: 비밀번호재설정 페이지 조회
 *    description: 비밀번호재설정 메인페이지를 조회합니다.
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: Access token
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 비밀번호재설정 페이지 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Verification successful
 *     400:
 *      description: 클라이언트 요청 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Client Error
 */

//비밀번호 재설정하기 
