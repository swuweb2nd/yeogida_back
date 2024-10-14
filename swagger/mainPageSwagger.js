/**
 * @swagger
 * /api/main/recent:
 *   get:
 *     tags:
 *       - Itineraries
 *     summary: 7일간의 게시물을 인기순 또는 최신순으로 조회합니다.
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: 
 *             - popularity
 *             - newest
 *         description: "정렬 기준 (popularity: 인기순, newest: 최신순)"  # 문자열로 인식하게끔 수정
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Itinerary'
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/main/top-destinations:
 *   get:
 *     tags:
 *       - Itineraries
 *     summary: 가장 많이 여행한 도시 Top 5를 조회합니다.
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   destination:
 *                     type: string
 *                     description: 도시 이름
 *                   visit_count:
 *                     type: integer
 *                     description: 방문 횟수
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/main/search:
 *   get:
 *     tags:
 *       - Itineraries
 *     summary: 여행 일정을 제목, 목적지, 설명에서 검색합니다.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: "검색할 단어"  # 문자열로 인식하게끔 수정
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Itinerary'
 *       400:
 *         description: 검색어가 제공되지 않았습니다.
 *       500:
 *         description: 서버 오류
 */
