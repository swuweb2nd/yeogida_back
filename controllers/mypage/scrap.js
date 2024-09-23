const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');


// 스크랩 폴더 목록 조회
exports.fetchScrapFolder = async (req, res) => {
    try {
        // 데이터베이스에서 스크랩 폴더 목록 조회
        const scrapFolders = await ScrapFolder.findAll({
            attributes: ['folderId', 'folderName', 'addDate'],
            order: [['addDate', 'DESC']] // 최신순 정렬
        });

        // 데이터 형식에 맞게 변환
        const formattedFolders = scrapFolders.map(folder => ({
            folderId: folder.folderId,
            folderName: folder.folderName,
            addDate: folder.addDate.toISOString().split('T')[0] // 날짜 형식을 YYYY-MM-DD로 변환
        }));

        // 정상적인 응답
        return res.status(200).json({
            message: "스크랩 폴더 목록 조회가 정상적으로 이루어졌습니다.",
            data: {
                scrapfolderList: formattedFolders
            }
        });

    } catch (error) {
        console.error('Error fetching scrap folders:', error);
        // 에러 응답
        return res.status(500).json({
            status: 500,
            message: "올바른 요청이 아닙니다."
        });
    }
};