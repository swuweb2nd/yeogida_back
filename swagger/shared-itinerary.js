/**
 * @swagger
 *
 * /api/shared-itineraries:
 *  get:
 *    summary: "공유된 일정 목록 조회"
 *    description: "공유된 일정 목록을 최신순 또는 인기순으로 조회합니다. (기본 정렬은 최신순)"
 *    tags: [shared-itineraries]
 *    parameters:
 *      - in: query
 *        name: sort
 *        schema:
 *          type: string
 *          enum: [latest, popular]
 *        required: false
 *        description: "정렬 기준 (latest: 최신순, popular: 인기순)"
 *    responses:
 *      200:
 *        description: "정렬된 여행지 목록을 반환합니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  destination_id:
 *                    type: integer
 *                    description: "여행지 고유 ID"
 *                  title:
 *                    type: string
 *                    description: "여행 제목"
 *                  image_url:
 *                    type: string
 *                    description: "여행지 썸네일 이미지 URL"
 *                  created_at:
 *                    type: string
 *                    format: date-time
 *                    description: "여행지 등록 시간"
 *      400:
 *        description: "잘못된 정렬 기준입니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "유효하지 않은 정렬 기준입니다"
 */

/**
 * @swagger
 *
 * /api/shared-itineraries/{shared-itineraries_id}:
 *  get:
 *    summary: "게시글 상세 조회"
 *    description: "특정 여행지 게시글의 상세 정보를 조회합니다."
 *    tags: [shared-itineraries]
 *    parameters:
 *      - in: path
 *        name: shared-itineraries_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: "조회할 게시글의 고유 ID"
 *    responses:
 *      200:
 *        description: "게시글 상세 정보 조회 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: "부산 1박 2일 여행"
 *                author:
 *                  type: string
 *                  example: "yeogida"
 *                date:
 *                  type: string
 *                  format: date
 *                  example: "2024-08-10"
 *                travel_dates:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: "2024-08-15 ~ 2024-08-16"
 *                locations:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: "해운대 해수욕장"
 *                      time:
 *                        type: string
 *                        example: "10:00 AM"
 *                      description:
 *                        type: string
 *                        example: "부산에서 가장 유명한 해수욕장"
 *                map_url:
 *                  type: string
 *                  example: "https://maps.example.com/embed/trip_route"
 *                content:
 *                  type: string
 *                  example: "게시글 내용"
 *                likes:
 *                  type: integer
 *                  example: 20
 *                comments:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      user:
 *                        type: string
 *                        example: "commenter01"
 *                      content:
 *                        type: string
 *                        example: "댓글 작성 내용"
 *                      timestamp:
 *                        type: string
 *                        example: "2024-08-13T10:15:30Z"
 *      404:
 *        description: "게시글을 찾을 수 없습니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "게시글을 찾을 수 없습니다."
 */

/**
 * @swagger
 *
 * /api/shared-itineraries/{shared-itineraries_id}/comments:
 *  post:
 *    summary: "댓글 작성"
 *    description: "특정 게시글에 댓글을 작성합니다."
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: shared-itineraries_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: "댓글을 작성할 게시글의 고유 ID"
 *    requestBody:
 *      description: "댓글 작성 내용"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: integer
 *                description: "댓글 작성자의 ID"
 *              content:
 *                type: string
 *                description: "댓글 내용"
 *    responses:
 *      201:
 *        description: "댓글 작성 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "댓글이 성공적으로 작성되었습니다."
 *      400:
 *        description: "잘못된 요청"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "잘못된 요청입니다."
 */

/**
 * @swagger
 *
 * /api/shared-itineraries/{shared-itineraries_id}/like:
 *  post:
 *    summary: "게시글 좋아요"
 *    description: "공유된 여행일정 게시글에 좋아요 추가"
 *    tags: [Likes]
 *    parameters:
 *      - in: path
 *        name: shared-itineraries_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: "좋아요를 추가할 게시글의 고유 ID"
 *    responses:
 *      200:
 *        description: "좋아요 추가 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "좋아요가 성공적으로 추가되었습니다."
 *      404:
 *        description: "게시글을 찾을 수 없습니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "게시글을 찾을 수 없습니다."
 */

/**
 * @swagger
 *
 * /api/shared-itineraries/{shared-itineraries_id}/scrap:
 *  post:
 *    summary: "게시글 스크랩"
 *    description: "특정 게시글을 스크랩하여 폴더에 저장합니다."
 *    tags: [Scraps]
 *    parameters:
 *      - in: path
 *        name: shared-itineraries_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: "스크랩할 게시글의 고유 ID"
 *    requestBody:
 *      description: "스크랩할 폴더 선택"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              folder_id:
 *                type: integer
 *                description: "스크랩을 저장할 폴더의 ID"
 *    responses:
 *      200:
 *        description: "스크랩 성공"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "스크랩이 성공적으로 저장되었습니다."
 *      404:
 *        description: "게시글 또는 폴더를 찾을 수 없습니다."
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "게시글 또는 폴더를 찾을 수 없습니다."
 */