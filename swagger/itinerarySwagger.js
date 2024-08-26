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
 *     summary: 전체 여행일정을 조회합니다.
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Itinerary'
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
