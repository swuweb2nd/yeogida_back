const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// S3 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer 설정
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        key: function (req, file, cb) {
            const ext = file.originalname.split('.').pop();
            if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
                return cb(new Error('Only images are allowed'));
            }
            cb(null, `${Date.now()}.${ext}`);
        },
    }),
    acl: 'public-read', // 업로드된 파일이 공개 접근 가능
    limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
});

// 이미지 업로드 라우터
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log('🛠️ Image uploaded to S3:', req.file.location);
        res.status(200).json({ location: req.file.location });
    } catch (error) {
        console.error('❌ Failed to upload image:', error.message);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});
/*
router.post('/img', upload.single('file'), (req, res) => {
    try {
        res.status(200).json({ location: req.file.location }); // S3 URL 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});
*/

module.exports = router;
