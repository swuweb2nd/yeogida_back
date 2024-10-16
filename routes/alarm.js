const express = require('express');
const alarmController = require('../controllers/alarmController'); // 컨트롤러 불러오기
const router = express.Router();

// 알림 생성
router.post('/alarms', alarmController.createAlarm);

// 알림 조회
router.get('/alarms/:user_id', alarmController.getAlarms);

// 알림 상태 업데이트
router.patch('/alarms/:alarm_id', alarmController.updateAlarmStatus);

// 알림 삭제
router.delete('/alarms/:alarm_id', alarmController.deleteAlarm);

module.exports = router;