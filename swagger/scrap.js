//스크랩 폴더 조회
/**
 * @swagger
 * paths:
 *  /mypage/scrap:
 *   get:
 *    tags:
 *    - Scrap
 *    summary: 스크랩 폴더 목록 조회
 *    description: 사용자의 스크랩 폴더 목록을 조회합니다.
 *    responses:
 *     200:
 *      description: 스크랩 폴더 목록 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "스크랩 폴더 목록 조회가 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  scrapfolderList:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        folderId:
 *                          type: integer
 *                          description: 폴더 ID
 *                          example: 1
 *                        folderName:
 *                          type: string
 *                          description: 폴더 이름
 *                          example: "폴더 1"
 *                        addDate:
 *                          type: string
 *                          format: date
 *                          description: 폴더 추가 날짜
 *                          example: "2024-05-13"
 *     500:
 *      description: 서버 오류
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

//스크랩 폴더 생성
/**
 * @swagger
 * paths:
 *  /mypage/scrap/add:
 *   post:
 *    tags:
 *    - Scrap
 *    summary: 스크랩 폴더 생성
 *    description: 새로운 스크랩 폴더를 생성합니다. 폴더 이름을 요청 본문으로 전송합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              folderName:
 *                type: string
 *                description: 생성할 스크랩 폴더의 이름
 *                example: "부산"
 *    responses:
 *     201:
 *      description: 스크랩 폴더 생성 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "스크랩 폴더가 성공적으로 생성되었습니다."
 *              data:
 *                type: object
 *                properties:
 *                  folderId:
 *                    type: integer
 *                    description: 생성된 폴더의 ID
 *                    example: 1
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
 *                example: "잘못된 요청입니다. `folderName`을 확인하세요."
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


//스크랩 폴더 삭제
/**
 * @swagger
 * paths:
 *  /mypage/scrap/delete/{folderId}:
 *   delete:
 *    tags:
 *    - Scrap
 *    summary: 스크랩 폴더 삭제
 *    description: 특정 스크랩 폴더를 삭제합니다. 폴더 ID를 경로 변수로 전달해야 합니다.
 *    parameters:
 *    - in: path
 *      name: folderId
 *      required: true
 *      description: 삭제할 스크랩 폴더의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            additionalProperties: false
 *    responses:
 *     200:
 *      description: 스크랩 폴더 삭제 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "스크랩 폴더 삭제가 정상적으로 이루어졌습니다."
 *     404:
 *      description: 잘못된 folderId로 인해 스크랩 폴더를 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "folderId를 찾을 수 없습니다."
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

//폴더 이름 수정
/**
 * @swagger
 * paths:
 *  /mypage/scrap/rename/{folderId}:
 *   put:
 *    tags:
 *    - Scrap
 *    summary: 스크랩 폴더 이름 수정
 *    description: 특정 스크랩 폴더의 이름을 수정합니다. 폴더 ID를 경로 변수로 전달하고, 새 폴더 이름을 요청 본문으로 전송합니다.
 *    parameters:
 *    - in: path
 *      name: folderId
 *      required: true
 *      description: 수정할 스크랩 폴더의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              folderId:
 *                type: integer
 *                description: 수정할 폴더의 ID
 *                example: 1
 *              folderName:
 *                type: string
 *                description: 수정할 폴더의 새 이름
 *                example: "수정된 폴더 이름"
 *    responses:
 *     200:
 *      description: 폴더 이름 수정 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "폴더 이름 수정이 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  folderId:
 *                    type: integer
 *                    description: 수정된 폴더의 ID
 *                    example: 1
 *                  folderName:
 *                    type: string
 *                    description: 수정된 폴더의 이름
 *                    example: "수정된 폴더 이름"
 *     400:
 *      description: 요청 형식이 잘못된 경우
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "올바른 형식이 아닙니다."
 *     404:
 *      description: 잘못된 folderId로 인해 폴더를 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "Career에서 ID 4를 찾을 수 없습니다."
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

//스크랩 목록 조회
/**
 * @swagger
 * paths:
 *  /mypage/scrap/{folderId}:
 *   get:
 *    tags:
 *    - Scrap
 *    summary: 특정 스크랩 폴더의 스크랩 목록 조회
 *    description: 특정 스크랩 폴더에 포함된 스크랩 목록을 조회합니다. `folderId`를 경로 변수로 전달하여 폴더에 포함된 스크랩들을 반환합니다.
 *    parameters:
 *    - in: path
 *      name: folderId
 *      required: true
 *      description: 조회할 스크랩 폴더의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    responses:
 *     200:
 *      description: 스크랩 목록 조회 성공
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 성공 메시지
 *                example: "일정 목록 조회가 정상적으로 이루어졌습니다."
 *              data:
 *                type: object
 *                properties:
 *                  ScrapList:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        folderId:
 *                          type: integer
 *                          description: 스크랩 폴더의 ID
 *                          example: 1
 *                        folderName:
 *                          type: string
 *                          description: 스크랩 폴더의 이름
 *                          example: "여행"
 *                        scrapId:
 *                          type: integer
 *                          description: 스크랩의 ID
 *                          example: 1
 *                        scrapName:
 *                          type: string
 *                          description: 스크랩의 이름
 *                          example: "제주도 여행"
 *                        addDate:
 *                          type: string
 *                          format: date
 *                          description: 스크랩이 추가된 날짜
 *                          example: "2024-05-13"
 *     400:
 *      description: 잘못된 요청 파라미터
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "올바른 요청이 아닙니다. folderId를 주세요."
 *     404:
 *      description: 요청한 folderId에 해당하는 폴더를 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "folderId를 찾을 수 없습니다."
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


//스크랩 삭제
/**
 * @swagger
 * paths:
 *  /mypage/scrap/{folderId}/delete/{scrapId}:
 *   delete:
 *    tags:
 *    - Scrap
 *    summary: 특정 스크랩 삭제
 *    description: 특정 스크랩을 삭제합니다. `folderId`와 `scrapId`를 경로 변수로 전달하여 해당 스크랩을 삭제합니다.
 *    parameters:
 *    - in: path
 *      name: folderId
 *      required: true
 *      description: 삭제할 스크랩이 포함된 폴더의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    - in: path
 *      name: scrapId
 *      required: true
 *      description: 삭제할 스크랩의 ID
 *      schema:
 *        type: integer
 *        example: 123
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              # requestBody는 비어 있습니다.
 *    responses:
 *     200:
 *      description: 스크랩 삭제 성공
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
 *      description: 잘못된 scrapId로 인해 스크랩을 찾을 수 없음
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: 오류 메시지
 *                example: "scrapId를 찾을 수 없습니다."
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
