/**
 * @swagger
 * tags:
 *   name: Itineraries
 *   description: 여행일정 관리 API
 */

/**
 * @swagger
 * /api/itineraries:
 *   get:
 *     tags:
 *       - Itineraries
 *     summary: 전체, 조건별 여행일정을 조회합니다.
 *     description: 사용자가 접근할 수 있는 모든 여행일정을 조회합니다. 여기에는 사용자가 직접 만든 일정과 타인으로부터 공유받은 일정이 모두 포함됩니다.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: 특정 사용자가 만든 일정 또는 공유받은 일정을 필터링
 *       - in: query
 *         name: public_private
 *         schema:
 *           type: boolean
 *         description: 공개 여부에 따른 일정 필터링 (true = 공개, false = 비공개)
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         description: 특정 목적지로 필터링
 *       - in: query
 *         name: startdate
 *         schema:
 *           type: string
 *           format: date
 *         description: 시작 날짜로 필터링 (YYYY-MM-DD)
 *       - in: query
 *         name: enddate
 *         schema:
 *           type: string
 *           format: date
 *         description: 종료 날짜로 필터링 (YYYY-MM-DD)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: 
 *              -newest
 *              -oldest
 *         description: "정렬 기준 newest: 최신순, oldest: 오래된 순"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: 
 *              -mine
 *              -shared
 *         description: "일정 유형 mine: 내가 만든 일정, shared: 공유받은 일정)"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to retrieve itineraries
 */



/**
 * @swagger
 * /api/itineraries:
 *   post:
 *     tags:
 *       - Itineraries
 *     summary: 새로운 여행일정을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itinerary'
 *     responses:
 *       201:
 *         description: 생성 성공
 */

/**
 * @swagger
 * /api/itineraries/{itinerary_id}:
 *   get:
 *     tags:
 *       - Itineraries
 *     summary: 특정 여행일정을 조회합니다.
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
 *               $ref: '#/components/schemas/Itinerary'
 *       404:
 *         description: 여행일정을 찾을 수 없음
 */

/**
 * @swagger
 * /api/itineraries/{itinerary_id}:
 *   put:
 *     tags:
 *       - Itineraries
 *     summary: 특정 여행일정을 수정합니다.
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
 *             $ref: '#/components/schemas/Itinerary'
 *     responses:
 *       200:
 *         description: 수정 성공
 *       404:
 *         description: 여행일정을 찾을 수 없음
 */

/**
 * @swagger
 * /api/itineraries/{itinerary_id}:
 *   delete:
 *     tags:
 *       - Itineraries
 *     summary: 특정 여행일정을 삭제합니다.
 *     parameters:
 *       - name: itinerary_id
 *         in: path
 *         required: true
 *         description: 여행일정 ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: 여행일정을 찾을 수 없음
 */
