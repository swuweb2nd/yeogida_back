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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetItinerariesRequest'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Itinerary'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized: Missing user ID
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
