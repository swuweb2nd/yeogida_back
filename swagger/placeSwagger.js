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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Places not found for the given itinerary_id
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to retrieve places
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request body
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create place
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Place not found
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to retrieve place
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request body
 *       404:
 *         description: 여행장소를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Place not found
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update place
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Place not found
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete place
 */
