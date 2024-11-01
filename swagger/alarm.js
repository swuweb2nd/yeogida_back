// 알림 생성
/**
 * @swagger
 * paths:
 *  /alarms:
 *   post:
 *    tags:
 *    - alarms
 *    summary: 새로운 알림 생성
 *    description: 사용자에게 새로운 알림을 생성합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: integer
 *                description: 알림을 받는 사용자 ID
 *              itinerary_id:
 *                type: integer
 *                description: 알림과 관련된 여행 일정 ID
 *              status:
 *                type: integer
 *                description: 알림의 상태 (0: 친구 요청, 1: 여행 공유)
 *            required:
 *              - user_id
 *              - itinerary_id
 *              - status
 *    responses:
 *     201:
 *      description: 성공적으로 알림이 생성되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              alarm_id:
 *                type: integer
 *                example: 1
 *              user_id:
 *                type: integer
 *                example: 2
 *              itinerary_id:
 *                type: integer
 *                example: 5
 *              status:
 *                type: integer
 *                example: 0
 *     500:
 *      description: 알림 생성에 실패했습니다.
 */

// 알림 조회
/**
 * @swagger
 * paths:
 *  /alarms/{user_id}:
 *   get:
 *    tags:
 *    - alarms
 *    summary: 사용자 알림 조회
 *    description: 특정 사용자의 모든 알림을 조회합니다.
 *    parameters:
 *    - in: path
 *      name: user_id
 *      required: true
 *      description: 알림을 조회할 사용자 ID
 *      schema:
 *        type: integer
 *    responses:
 *     200:
 *      description: 사용자의 알림 목록을 반환합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                alarm_id:
 *                  type: integer
 *                  example: 1
 *                user_id:
 *                  type: integer
 *                  example: 2
 *                itinerary_id:
 *                  type: integer
 *                  example: 5
 *                status:
 *                  type: integer
 *                  example: 0
 *     500:
 *      description: 알림 조회에 실패했습니다.
 */

// 알림 상태 업데이트
/**
 * @swagger
 * paths:
 *  /alarms/{alarm_id}:
 *   patch:
 *    tags:
 *    - alarms
 *    summary: 알림 상태 업데이트
 *    description: 특정 알림의 상태를 업데이트합니다.
 *    parameters:
 *    - in: path
 *      name: alarm_id
 *      required: true
 *      description: 상태를 업데이트할 알림 ID
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *                description: 새 알림 상태 값
 *                example: 1
 *    responses:
 *     200:
 *      description: 알림 상태가 성공적으로 업데이트되었습니다.
 *     400:
 *      description: 유효하지 않은 상태 값입니다.
 *     404:
 *      description: 알림을 찾을 수 없습니다.
 *     500:
 *      description: 알림 상태 업데이트에 실패했습니다.
 */

// 알림 삭제
/**
 * @swagger
 * paths:
 *  /alarms/{alarm_id}:
 *   delete:
 *    tags:
 *    - alarms
 *    summary: 알림 삭제
 *    description: 특정 알림을 삭제합니다.
 *    parameters:
 *    - in: path
 *      name: alarm_id
 *      required: true
 *      description: 삭제할 알림 ID
 *      schema:
 *        type: integer
 *    responses:
 *     200:
 *      description: 알림이 성공적으로 삭제되었습니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "알림이 삭제되었습니다."
 *     500:
 *      description: 알림 삭제에 실패했습니다.
 */