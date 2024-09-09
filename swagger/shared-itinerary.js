//공유 일정 목록  조회(최신순)
/**
 * @swagger
 * paths:
 *  /shared-itineraries:
 *   get:
 *    tags:
 *    - Itineraries
 *    summary: 최근 정렬된 공유 여행지 목록 조회
 *    description: 주어진 정렬 기준에 따라 공유된 여행지 목록을 반환합니다. status=recent일 경우 최신 순으로 정렬됩니다.
 *    parameters:
 *    - in: query
 *      name: status
 *      required: true
 *      description: 정렬 기준 (현재는 'recent'만 사용)
 *      schema:
 *        type: string
 *    responses:
 *     200:
 *      description: 정렬된 여행지 목록을 반환합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "정렬된 여행지 목록을 반환합니다."
 *              data:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    destination_id:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: "부산 1박 2일 여행"
 *                    description:
 *                      type: string
 *                      example: "부산 1박 2일 여행"
 *                    image_url:
 *                      type: string
 *                      example: "https://example.com/busan.jpg"
 *                    date:
 *                      type: string
 *                      example: "2024년 8월 16일"
 *                    author:
 *                      type: object
 *                      properties:
 *                        username:
 *                          type: string
 *                          example: "mijin6597"
 *                        profile_image_url:
 *                          type: string
 *                          example: "https://example.com/profile/mijin6597.jpg"
 *                    likes:
 *                      type: integer
 *                      example: 20
 *                    views:
 *                      type: integer
 *                      example: 3
 *     404:
 *      description: 게시글을 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "게시글을 찾을 수 없습니다."
 */


//공유 일정 목록 조회(인기순)
/**
 * @swagger
 * paths:
 *  /shared-itineraries:
 *   get:
 *    tags:
 *    - Itineraries
 *    summary: 인기 정렬된 공유 여행지 목록 조회
 *    description: 주어진 정렬 기준에 따라 공유된 여행지 목록을 반환합니다. status=popular일 경우 인기 순으로 정렬됩니다.
 *    parameters:
 *    - in: query
 *      name: status
 *      required: true
 *      description: 정렬 기준 (현재는 'popular'만 사용)
 *      schema:
 *        type: string
 *        example: popular
 *    responses:
 *     200:
 *      description: 정렬된 여행지 목록을 반환합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "정렬된 여행지 목록을 반환합니다."
 *              data:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    destination_id:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: "부산 1박 2일 여행"
 *                    description:
 *                      type: string
 *                      example: "부산 1박 2일 여행"
 *                    image_url:
 *                      type: string
 *                      example: "https://example.com/busan.jpg"
 *                    date:
 *                      type: string
 *                      example: "2024년 8월 16일"
 *                    author:
 *                      type: object
 *                      properties:
 *                        username:
 *                          type: string
 *                          example: "mijin6597"
 *                        profile_image_url:
 *                          type: string
 *                          example: "https://example.com/profile/mijin6597.jpg"
 *                    likes:
 *                      type: integer
 *                      example: 20
 *                    views:
 *                      type: integer
 *                      example: 3
 *     404:
 *      description: 게시글을 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "게시글을 찾을 수 없습니다."
 */


//공유 일정 상세 조회(DAY1포함)
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}:
 *   get:
 *    tags:
 *    - Itineraries
 *    summary: 특정 공유 일정 조회
 *    description: 주어진 ID에 해당하는 공유 일정을 조회합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 조회할 공유 일정의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    responses:
 *     200:
 *      description: 공유 일정이 성공적으로 조회되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "공유 일정이 성공적으로 조회되었습니다."
 *              data:
 *                type: object
 *                properties:
 *                  itinerary_id:
 *                    type: integer
 *                    example: 1
 *                  title:
 *                    type: string
 *                    example: "부산 1박 2일 여행"
 *                  author:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: "mijin6597"
 *                      profile_image_url:
 *                        type: string
 *                        example: "https://example.com/profile/mijin6597.jpg"
 *                  date_range:
 *                    type: string
 *                    example: "2024/06/05 - 2024/06/06"
 *                  current_day:
 *                    type: integer
 *                    example: 1
 *                  map_locations:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        order:
 *                          type: integer
 *                          example: 1
 *                        time:
 *                          type: string
 *                          example: "9시"
 *                        location:
 *                          type: string
 *                          example: "부산역"
 *                        description:
 *                          type: string
 *                          example: "도착 및 여행 시작"
 *                        content:
 *                          type: string
 *                          example: "DAY1의 여행 타임 테이블 내용입니다."
 *                  content:
 *                    type: string
 *                    example: "게시글 내용입니다."
 *                  likes:
 *                    type: integer
 *                    example: 20
 *                  comments:
 *                    type: integer
 *                    example: 3
 *     404:
 *      description: 공유 일정을 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "공유 일정을 찾을 수 없습니다."
 */


//공유 일정 상세 조회(특정 DAY 조회)
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/day/{day}:
 *   get:
 *    tags:
 *    - Itineraries
 *    summary: 특정 일차 일정 조회
 *    description: 특정 공유 일정의 특정 일차(day)의 일정을 조회합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 조회할 공유 일정의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    - in: path
 *      name: day
 *      required: true
 *      description: 조회할 일차(day)
 *      schema:
 *        type: integer
 *        example: 2
 *    responses:
 *     200:
 *      description: 특정 일차 일정이 성공적으로 조회되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "특정 일차 일정이 성공적으로 조회되었습니다."
 *              data:
 *                type: object
 *                properties:
 *                  day:
 *                    type: integer
 *                    example: 2
 *                  date:
 *                    type: string
 *                    example: "2024/06/06"
 *                  map_locations:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        order:
 *                          type: integer
 *                          example: 1
 *                        time:
 *                          type: string
 *                          example: "10시"
 *                        location:
 *                          type: string
 *                          example: "해운대"
 *                        description:
 *                          type: string
 *                          example: "바다 산책"
 *                        content:
 *                          type: string
 *                          example: "DAY2의 여행 타임 테이블 내용입니다."
 *     404:
 *      description: 해당 일차의 일정을 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "해당 일차의 일정을 찾을 수 없습니다."
 */


//댓글 작성
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


//댓글 수정
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/comments:
 *   put:
 *    tags:
 *    - Comments
 *    summary: 댓글 수정
 *    description: 특정 공유 일정 게시글의 댓글을 수정합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 댓글이 달린 공유 일정 게시글의 ID
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
 *              user_id:
 *                type: integer
 *                description: 댓글을 수정하는 사용자의 ID
 *                example: 1
 *              content:
 *                type: string
 *                description: 수정된 댓글 내용
 *                example: "여행정보가 유용해요.(수정됨)"
 *    responses:
 *     201:
 *      description: 댓글이 성공적으로 수정되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "댓글이 성공적으로 수정되었습니다."
 *     400:
 *      description: 잘못된 요청입니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 400
 *              message:
 *                type: string
 *                example: "잘못된 요청입니다."
 */


//댓글 삭제
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/comments:
 *   delete:
 *    tags:
 *    - Comments
 *    summary: 댓글 삭제
 *    description: 특정 공유 일정 게시글의 댓글을 삭제합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 댓글이 달린 공유 일정 게시글의 ID
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
 *              user_id:
 *                type: integer
 *                description: 댓글을 삭제하는 사용자의 ID
 *                example: 1
 *              content:
 *                type: string
 *                description: 삭제하려는 댓글 내용
 *                example: "여행정보가 유용해요."
 *
 */


//스크랩
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/scrap:
 *   post:
 *    tags:
 *    - Scrap
 *    summary: 공유 일정 스크랩
 *    description: 특정 공유 일정 게시글을 사용자의 폴더에 스크랩합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 스크랩할 공유 일정 게시글의 ID
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
 *              folder_id:
 *                type: integer
 *                description: 스크랩을 저장할 폴더의 ID
 *                example: 5
 *    responses:
 *     200:
 *      description: 스크랩이 성공적으로 저장되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "스크랩이 성공적으로 저장되었습니다."
 *     404:
 *      description: 게시글 또는 폴더를 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "게시글 또는 폴더를 찾을 수 없습니다."
 */


//스크랩 취소
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/scrap:
 *   delete:
 *    tags:
 *    - Scrap
 *    summary: 공유 일정 스크랩 취소
 *    description: 특정 공유 일정 게시글에 대해 사용자가 저장한 스크랩을 취소합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 스크랩을 취소할 공유 일정 게시글의 ID
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
 *              folder_id:
 *                type: integer
 *                description: 스크랩을 취소할 폴더의 ID
 *                example: 5
 *    responses:
 *     200:
 *      description: 스크랩이 성공적으로 취소되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "스크랩이 성공적으로 취소되었습니다."
 *     404:
 *      description: 게시글 또는 폴더를 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "게시글 또는 폴더를 찾을 수 없습니다."
 */



//좋아요
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/like:
 *   post:
 *    tags:
 *    - Like
 *    summary: 공유 일정에 좋아요 추가
 *    description: 특정 공유 일정 게시글에 사용자가 좋아요를 추가합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 좋아요를 추가할 공유 일정 게시글의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    responses:
 *     201:
 *      description: 좋아요가 성공적으로 추가되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "좋아요가 성공적으로 추가되었습니다."
 *     404:
 *      description: 게시글을 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "게시글을 찾을 수 없습니다."
 */


//좋아요 취소
/**
 * @swagger
 * paths:
 *  /shared-itineraries/{shared-itineraries_id}/like:
 *   delete:
 *    tags:
 *    - Like
 *    summary: 공유 일정에 좋아요 취소
 *    description: 특정 공유 일정 게시글에 대한 사용자의 좋아요를 취소합니다.
 *    parameters:
 *    - in: path
 *      name: shared-itineraries_id
 *      required: true
 *      description: 좋아요를 취소할 공유 일정 게시글의 ID
 *      schema:
 *        type: integer
 *        example: 1
 *    responses:
 *     200:
 *      description: 좋아요가 성공적으로 취소되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "좋아요가 성공적으로 취소되었습니다."
 *     404:
 *      description: 게시글을 찾을 수 없습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                example: 404
 *              message:
 *                type: string
 *                example: "게시글을 찾을 수 없습니다."
 */