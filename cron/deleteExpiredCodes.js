const { CronJob } = require('cron');
const { User } = require('../models');  // User 모델
const { Op } = require('sequelize'); // 시퀄라이즈 Lib에서 제공하는 객체

// 매일 자정에 만료된 인증번호 삭제 작업
const deleteExpiredCodes = new CronJob('0 0 * * *', async () => {
    try {
        const result = await User.update(
            { verificationCode: null, verificationExpiresAt: null },
            { where: { verificationExpiresAt: { [Op.lt]: new Date() } } }
        );
        console.log(`Expired verification codes cleared: ${result}`);
    } catch (error) {
        console.error('Error clearing expired verification codes:', error);
    }
});

// cron 작업을 외부에서 불러와서 실행할 수 있도록 export
module.exports = deleteExpiredCodes;