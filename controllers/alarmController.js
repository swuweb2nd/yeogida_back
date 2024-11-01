const { alarm, friendList, itinerary } = require('../models');

// 알림 생성
exports.createAlarm = async (req, res) => {
  const { user_id, itinerary_id, status } = req.body;
  try {
    const newAlarm = await alarm.create({
      user_id,
      itinerary_id,
      status,
    });
    res.status(201).json(newAlarm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '알림 생성에 실패했습니다.' });
  }
};

// 알림 조회
exports.getAlarms = async (req, res) => {
  const { user_id } = req.params;
  try {
    // 특정 사용자의 알림 조회
    const alarms = await alarm.findAll({ where: { user_id } });
    res.status(200).json(alarms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '알림 조회에 실패했습니다.' });
  }
};

// 알림 상태 업데이트
exports.updateAlarmStatus = async (req, res) => {
  const { alarm_id } = req.params;
  const { status } = req.body;

  try {
    // 친구 요청 수락
    if (status === 0) {
      const friendRequest = await friendList.findOne({ where: { alarm_id } });
      if (friendRequest) {
        await friendList.update({ status: 1 }, { where: { alarm_id } }); // 친구 요청 수락
        await alarm.update({ status: 1 }, { where: { alarm_id } }); // 알림 상태 업데이트
        return res.status(200).json({ message: '친구 요청이 수락되었습니다.' });
      } else {
        return res.status(404).json({ message: '친구 요청을 찾을 수 없습니다.' });
      }
    } else if (status === 1) {
      // 여행 공유 알림 수락 처리
      const tripShare = await itinerary.findOne({ where: { alarm_id } });
      if (tripShare) {
        await alarm.update({ status: 2 }, { where: { alarm_id } }); // 알림 상태 업데이트
        return res.status(200).json({ message: '여행 공유 알림이 처리되었습니다.' });
      } else {
        return res.status(404).json({ message: '여행 공유 알림을 찾을 수 없습니다.' });
      }
    } else {
      return res.status(400).json({ message: '유효하지 않은 상태 값입니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '알림 상태 업데이트에 실패했습니다.' });
  }
};

// 알림 삭제
exports.deleteAlarm = async (req, res) => {
  const { alarm_id } = req.params;
  try {
    await alarm.destroy({ where: { alarm_id } });
    res.status(200).json({ message: '알림이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '알림 삭제에 실패했습니다.' });
  }
};