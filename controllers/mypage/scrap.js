const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/user');


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

//스크랩 폴더 생성
exports.createScrapFolder = async (req, res) => {
    try {
        const user_id = req.user.id; // req.user에서 로그인된 사용자 정보를 얻음

        const { folderName } = req.body; // 클라이언트에서 보내준 폴더 이름을 받음
    
        // 폴더 이름이 없을 경우 에러 응답
        if (!folderName) {
            return res.status(400).json({
            message: "폴더 이름을 입력해주세요."
            });
        }

        // 폴더를 데이터베이스에 저장하는 코드 (데이터베이스 모델에 맞게 수정 필요)
        const newFolder = await ScrapFolder.create({
            folderName: folderName,
            addDate: addDate
        });
    
        // 폴더가 정상적으로 생성되었을 때 응답
        return res.status(200).json({
            message: "스크랩 폴더가 성공적으로 생성되었습니다.",
            data: {
                folderId: newFolder.id,
                folderName: newFolder.folderName,
                createDate: newFolder.createAt
            }
        });
        } catch (error) {
        console.error(error);
        // 서버 오류 처리
        return res.status(500).json({
            message: "서버 오류가 발생했습니다."
        });
        }
    };
  


//스크랩 폴더 삭제
exports.deleteScrapFolder = async (req, res) => {
    try {
        const { folderId } = req.params;

        if(!folderId){
            return res.status(400).json({
                message: "folderId가 제공되지 않았습니다."
            });
        }

        //디비에서 folderId로 폴더 찾기
        const folder = await ScrapFolder.findOne({where: {scrapfolder_id:folderId }});

        //folderId에 해당하는 폴더 없으면 에러 반환
        if (!folder) {
            return res.status(404).json({
                message: "folderId를 찾을 수 없습니다."
            });
        }

        //폴더 삭제
        await folder.destroy();

        return res.status(200).json({
            message: "스크랩 폴더 삭제가 정상적으로 이루어졌습니다."
          });
        } catch (error) {
          console.error(error);
          // 에러 처리
          return res.status(500).json({
            message: "서버 오류가 발생했습니다."
          });
        }
    };

//스크랩 폴더 이름 수정
exports.editScrapFolder = async (req, res) => {
    try {
        const { folderId } = req.params; 
        const { folderName } = req.body;

        // folderName이 없으면 400 에러 반환
        if (!folderName) {
            return res.status(400).json({
            message: "폴더 이름을 입력해주세요."
            });
        }

    // 디비에서 folderId로 찾기
    const folder = await ScrapFolder.findOne({ where: { scrapfolder_id: folderId } });

    // 폴더가 존재하지 않으면 404 
    if (!folder) {
      return res.status(404).json({
        message: "folderId를 찾을 수 없습니다."
      });
    }

    // 폴더 이름 수정
    folder.scrapfolder_name = folderName;
    await folder.save();

    // 수정 성공
    return res.status(200).json({
      message: "폴더 이름이 성공적으로 수정되었습니다.",
      data: {
        folderId: folder.scrapfolder_id,
        folderName: folder.scrapfolder_name
      }
    });
  } catch (error) {
    console.error(error);
    // 에러 처리
    return res.status(500).json({
      message: "서버 오류가 발생했습니다."
    });
  }
};
    

//특정 스크랩 폴더의 스크랩 목록 조회
exports.fetchScrap = async (req, res) => {
    try {
      const { folderId } = req.params; // 경로에서 folderId를 가져옴
  
      // folderId가 없을 경우 400 에러 
      if (!folderId) {
        return res.status(400).json({
          message: "올바른 요청이 아닙니다. folderId를 주세요."
        });
      }
  
      // 디비에서 해당 folderId로 스크랩 폴더 찾기
      const folder = await ScrapFolder.findOne({ 
        where: { scrapfolder_id: folderId },
        include: [
          {
            model: Scrap, // 폴더에 포함된 스크랩 조회
            attributes: ['scrap_id', 'scrap_name', 'createdAt']
          }
        ]
      });
  
      // 폴더가 존재하지 않으면 404 
      if (!folder) {
        return res.status(404).json({
          message: "folderId에 해당하는 폴더를 찾을 수 없습니다."
        });
      }
  
      // 스크랩 목록 불러오기
      const scrapList = folder.Scraps.map(scrap => ({
        scrapId: scrap.scrap_id,
        scrapName: scrap.scrap_name,
        addDate: scrap.createdAt
      }));
  
      return res.status(200).json({
        message: "일정 목록 조회가 정상적으로 이루어졌습니다.",
        data: {
          ScrapList: scrapList
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "서버 오류가 발생했습니다."
      });
    }
  };
  
//특정 스크랩 삭제
exports.deleteScrap = async (req, res) => {
    try {
      const { folderId, scrapId } = req.params; 
  
      // folderId나 scrapId가 없을 경우 400 에러 
      if (!folderId || !scrapId) {
        return res.status(400).json({
          message: "올바른 요청이 아닙니다. folderId와 scrapId를 주세요."
        });
      }
  
      // 스크랩이 해당 폴더에 속해 있는지 확인
      const scrap = await Scrap.findOne({ 
        where: { 
          scrap_id: scrapId,
          scrapfolder_id: folderId 
        }
      });
  
      // 스크랩이 존재하지 않으면 404 반환
      if (!scrap) {
        return res.status(404).json({
          message: "scrapId를 찾을 수 없습니다."
        });
      }
  
      // 스크랩 삭제
      await scrap.destroy();
  
      // 성공적으로 삭제된 경우 200 응답
      return res.status(200).json({
        message: "활동 삭제가 정상적으로 이루어졌습니다."
      });
    } catch (error) {
      console.error(error);
      // 서버 오류 처리
      return res.status(500).json({
        message: "서버 오류가 발생했습니다."
      });
    }
  };
  