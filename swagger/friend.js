

//친구 목록 조회 최신순
/**
 * @swagger
 * paths:
 *  /mypage/friend?status=recent:
 *   get:
 *    tags:
 *    - Friend
 *    summary: 친구 목록 조회
 *    description: 사용자가 최근 추가된 친구 목록을 조회합니다.
 *    parameters:
 *    - in: query
 *      name: status
 *      required: true
 *      description: 조회할 친구 목록의 유형 (recent 또는 name)
 *      schema:
 *        type: string
 *        enum: [recent, name]
 *        example: recent
 *    responses:
 *     200:
 *      description: 친구 목록 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 응답 메시지
 *                example: "친구 목록 조회가 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  friendList:
 *                    type: array
 *                    description: 친구 목록
 *                    items:
 *                      type: object
 *                      properties:
 *                        friendId:
 *                          type: integer
 *                          description: 친구 ID
 *                          example: 1
 *                        userId:
 *                          type: integer
 *                          description: 사용자 ID
 *                          example: 1
 *                        friendName:
 *                          type: String
 *                          description: 이름
 *                          example: "임세연"
 *                        addDate:
 *                          type: string
 *                          format: date
 *                          description: 친구 추가 날짜
 *                          example: "2024-05-13"
 *     500:
 *      description: 잘못된 쿼리 문자열 입력
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                description: 상태 코드
 *                example: 500
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "올바른 요청이 아닙니다. recent, name 요청을 주세요"
 */


//친구 목록 조회 이름순
/**
 * @swagger
 * paths:
 *  /mypage/friend?status=name:
 *   get:
 *    tags:
 *    - Friend
 *    summary: 친구 목록 조회
 *    description: 사용자가 이름별로 정렬된 친구 목록을 조회합니다.
 *    parameters:
 *    - in: query
 *      name: status
 *      required: true
 *      description: 조회할 친구 목록의 유형 (recent 또는 name)
 *      schema:
 *        type: string
 *        enum: [recent, name]
 *        example: name
 *    responses:
 *     200:
 *      description: 친구 목록 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 응답 메시지
 *                example: "친구 목록 조회가 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  friendList:
 *                    type: array
 *                    description: 친구 목록
 *                    items:
 *                      type: object
 *                      properties:
 *                        friendId:
 *                          type: integer
 *                          description: 친구 ID
 *                          example: 1
 *                        userId:
 *                          type: integer
 *                          description: 사용자 ID
 *                          example: 1
 *                        friendName:
 *                          type: String
 *                          description: 이름
 *                          example: "
 *                        addDate:
 *                          type: string
 *                          format: date
 *                          description: 친구 추가 날짜
 *                          example: "2024-05-13"
 *     500:
 *      description: 잘못된 쿼리 문자열 입력
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                description: 상태 코드
 *                example: 500
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "올바른 요청이 아닙니다. recent, name 요청을 주세요"
 */


//친구 삭제
/**
 * @swagger
 * paths:
 *  /mypage/friend/{friendId}:
 *   delete:
 *    tags:
 *    - Friend
 *    summary: 친구 삭제
 *    description: 사용자가 특정 친구를 삭제합니다.
 *    parameters:
 *    - in: path
 *      name: friendId
 *      required: true
 *      description: 삭제할 친구의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    responses:
 *     200:
 *      description: 친구 삭제 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "활동 삭제가 정상적으로 이루어졌습니다."
 *     404:
 *      description: 잘못된 friendId로 인해 친구를 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "friendId를 찾을 수 없습니다."
 */


//친구 추가 요청 목록 조회
/**
 * @swagger
 * paths:
 *  /mypage/friend/friendrequest:
 *   get:
 *    tags:
 *    - Friend
 *    summary: 친구 요청 목록 조회
 *    description: 사용자가 받은 친구 요청 목록을 조회합니다. friend 테이블에서 status가 1인 데이터만 반환합니다.
 *    responses:
 *     200:
 *      description: 친구 요청 목록 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 응답 메시지
 *                example: "친구 목록 조회가 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  friendList:
 *                    type: array
 *                    description: 친구 요청 목록
 *                    items:
 *                      type: object
 *                      properties:
 *                        friendId:
 *                          type: integer
 *                          description: 친구 ID
 *                          example: 1
 *                        userId:
 *                          type: integer
 *                          description: 요청을 보낸 사용자 ID
 *                          example: 1
 *                        friendName:
 *                          type: String
 *                          description: 이름
 *                          example: "
 *                        requestDate:
 *                          type: string
 *                          format: date
 *                          description: 친구 요청 날짜
 *                          example: "2024-05-13"
 *     500:
 *      description: 잘못된 요청
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                description: 상태 코드
 *                example: 500
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "올바른 요청이 아닙니다. recent, name 요청을 주세요"
 */


//친구 요청 승낙
/**
 * @swagger
 * paths:
 *  /mypage/friend/friendrequest/accept:
 *   post:
 *    tags:
 *    - Friend
 *    summary: 친구 요청 승낙
 *    description: 사용자가 특정 친구 요청을 승낙합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              friendId:
 *                type: integer
 *                description: "승낙할 친구 요청의 ID"
 *                example: 1
 *              friendStatus:
 *                type: integer
 *                description: "친구 요청의 상태 (1: 승낙)"
 *                example: 1
 *    responses:
 *     200:
 *      description: 친구 요청 승낙 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "친구 요청이 정상적으로 승낙되었습니다."
 *     404:
 *      description: 잘못된 friendId로 인해 친구 요청을 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "friendId를 찾을 수 없습니다."
 *     500:
 *      description: 서버 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 서버 오류 메시지
 *                example: "서버 오류가 발생했습니다."
 */




//친구 요청 거절
/**
 * @swagger
 * paths:
 *  /mypage/friend/friendrequest/reject:
 *   post:
 *    tags:
 *    - Friend
 *    summary: 친구 요청 거절
 *    description: 사용자가 특정 친구 요청을 거절합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              friendId:
 *                type: integer
 *                description: "거절할 친구 요청의 ID"
 *                example: 1
 *              friendStatus:
 *                type: integer
 *                description: "친구 요청의 상태 (2: 거절)"
 *                example: 2
 *    responses:
 *     200:
 *      description: 친구 요청 거절 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "친구 요청이 정상적으로 거절되었습니다."
 *     404:
 *      description: 잘못된 friendId로 인해 친구 요청을 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "friendId를 찾을 수 없습니다."
 *     500:
 *      description: 서버 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 서버 오류 메시지
 *                example: "서버 오류가 발생했습니다."
 */

//친구 검색
/**
 * @swagger
 * paths:
 *  /mypage/friend?search={friendName}:
 *   get:
 *    tags:
 *    - Friend
 *    summary: 친구 검색
 *    description: 친구 이름으로 검색하여, 상태가 1인 친구 목록을 조회합니다.
 *    parameters:
 *    - in: query
 *      name: search
 *      required: true
 *      description: 검색할 친구의 이름
 *      schema:
 *        type: string
 *        example: "홍길동"
 *    responses:
 *     200:
 *      description: 친구 검색 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "친구 검색이 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  searchFriend:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        userId:
 *                          type: integer
 *                          description: 친구의 사용자 ID
 *                          example: 123
 *                        userName:
 *                          type: string
 *                          description: 친구의 사용자 이름
 *                          example: "홍길동"
 *                        status:
 *                          type: integer
 *                          description: "친구 상태 (1: 유효)"
 *                          example: 1
 *     500:
 *      description: 서버 오류 또는 잘못된 요청
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                description: 오류 상태 코드
 *                example: 500
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "올바른 요청이 아닙니다."
 */



//친구 추가 요청
/**
 * @swagger
 * paths:
 *  /mypage/friend:
 *   post:
 *    tags:
 *    - Friend
 *    summary: 친구 추가
 *    description: 사용자가 친구를 추가합니다. 추가하려는 친구의 `userId`를 백엔드에 전송합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: integer
 *                description: 추가할 친구의 사용자 ID
 *                example: 12345
 *    responses:
 *     200:
 *      description: 친구 추가 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "친구가 성공적으로 추가되었습니다."
 *     400:
 *      description: 잘못된 요청
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "잘못된 요청입니다. `userId`를 확인하세요."
 *     404:
 *      description: 사용자 미발견
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "해당 사용자 ID를 찾을 수 없습니다."
 *     500:
 *      description: 서버 오류
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 서버 오류 메시지
 *                example: "서버 오류가 발생했습니다."
 */
