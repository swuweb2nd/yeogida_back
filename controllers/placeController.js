const axios = require('axios');
const { Place } = require('../models');

// 네이버 API 인증 정보
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// 장소 검색 API 엔드포인트 추가
exports.searchPlaces = async (req, res) => {
    const query = req.query.query; // 검색어를 쿼리 파라미터로 받음
    try {
        const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
            params: { query:query, display: 5, start: 1, sort: 'random' },
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
            },
        });
        res.status(200).json(response.data.items);
    } catch (error) {
        console.error('Error fetching data from Naver API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Naver API' });
    }
};



// 특정 여행일정에 대한 모든 여행장소 조회
exports.getPlacesByItineraryId = async (req, res) => {
    try {
        const places = await Place.findAll({ where: { itinerary_id: req.params.itinerary_id } });
        if (places.length > 0) {
            res.status(200).json(places);
        } else {
            res.status(404).json({ error: 'Places not found for the given itinerary_id' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve places' });
    }
};

// 특정 여행일정에 새로운 여행장소 추가
exports.createPlace = async (req, res) => {
    try {
        const place = await Place.create({
            ...req.body,
            itinerary_id: req.params.itinerary_id
        });
        res.status(201).json(place);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create place' });
    }
};

// 특정 여행장소 조회
exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findByPk(req.params.place_id);
        if (place) {
            res.status(200).json(place);
        } else {
            res.status(404).json({ error: 'Place not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve place' });
    }
};

// 특정 여행장소 수정
exports.updatePlace = async (req, res) => {
    try {
        const [updated] = await Place.update(req.body, { where: { place_id: req.params.place_id } });
        if (updated) {
            const updatedPlace = await Place.findByPk(req.params.place_id);
            res.status(200).json(updatedPlace);
        } else {
            res.status(404).json({ error: 'Place not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update place' });
    }
};

// 특정 여행장소 삭제
exports.deletePlace = async (req, res) => {
    try {
        const deleted = await Place.destroy({ where: { place_id: req.params.place_id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Place not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete place' });
    }
};
