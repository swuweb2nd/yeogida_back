/**
 * @swagger
 * tags:
 *   name: Places
 *   description: 여행장소 관리 API
 */

/**
 * @swagger
 * /api/itineraries/{itinerary_id}/places:
 *   get:
 *     tags:
 *       - Places
 *     summary: 특정 여행일정에 대한 모든 여행장소를 조회합니다.
 *     parameters:
 *       - name: itinerary_id
 *         in: path
 *         required: true
 *         description: 여행일정 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       404:
 *         description: 여행장소를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/itineraries/{itinerary_id}/places:
 *   post:
 *     tags:
 *       - Places
 *     summary: 특정 여행일정에 새로운 여행장소를 추가합니다.
 *     parameters:
 *       - name: itinerary_id
 *         in: path
 *         required: true
 *         description: 여행일정 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       201:
 *         description: 생성 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/places/{place_id}:
 *   get:
 *     tags:
 *       - Places
 *     summary: 특정 여행장소를 조회합니다.
 *     parameters:
 *       - name: place_id
 *         in: path
 *         required: true
 *         description: 여행장소 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: 여행장소를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/places/{place_id}:
 *   put:
 *     tags:
 *       - Places
 *     summary: 특정 여행장소를 수정합니다.
 *     parameters:
 *       - name: place_id
 *         in: path
 *         required: true
 *         description: 여행장소 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       200:
 *         description: 수정 성공
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 여행장소를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/places/{place_id}:
 *   delete:
 *     tags:
 *       - Places
 *     summary: 특정 여행장소를 삭제합니다.
 *     parameters:
 *       - name: place_id
 *         in: path
 *         required: true
 *         description: 여행장소 ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: 여행장소를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/places/search:
 *   get:
 *     tags:
 *       - Places
 *     summary: 장소 검색
 *     description: 네이버 지역 검색 API를 사용하여 장소를 검색합니다.
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: "검색할 장소의 키워드 (예: 카페)"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "검색 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: "장소의 이름"
 *                   link:
 *                     type: string
 *                     description: "네이버에서 장소의 상세 정보 링크"
 *                   category:
 *                     type: string
 *                     description: "장소의 카테고리"
 *                   description:
 *                     type: string
 *                     description: "장소에 대한 설명"
 *                   address:
 *                     type: string
 *                     description: "장소의 지번 주소"
 *                   roadAddress:
 *                     type: string
 *                     description: "장소의 도로명 주소"
 *                   mapx:
 *                     type: integer
 *                     description: "장소의 X 좌표 (지도에서의 위치)"
 *                   mapy:
 *                     type: integer
 *                     description: "장소의 Y 좌표 (지도에서의 위치)"
 *       400:
 *         description: "잘못된 요청 (쿼리 파라미터가 없음)"
 *       500:
 *         description: 서버 오류
 */

