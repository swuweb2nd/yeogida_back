const axios = require('axios');
const { Place } = require('../models');

// 네이버 API 인증 정보
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// 장소 검색 API 엔드포인트 추가
exports.searchPlaces = async (req, res) => {
    const query = req.query.query; // 인코딩 없이 사용
    console.log('🛠️ Searching places with query:', query);

    try {
        const apiUrl = 'https://openapi.naver.com/v1/search/local.json';
        const response = await axios.get(apiUrl, {
            params: { query: query, display: 5, start: 1, sort: 'random' },
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
            },
        });
        console.log('📍 Response from Naver API:', response.data);
        res.status(200).json(response.data.items);
    } catch (error) {
        console.error('❌ Error fetching data from Naver API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Naver API' });
    }
};

/*
exports.searchPlaces = async (req, res) => {
    const query = req.query.query; // 인코딩 없이 사용
    //const query = encodeURIComponent(req.query.query); // UTF-8 인코딩 적용
try {
    const apiUrl = 'https://openapi.naver.com/v1/search/local.json';
    console.log(`Requesting to Naver API with URL: ${apiUrl}?query=${query}`);
    
    const response = await axios.get(apiUrl, {
        params: { query: query, display: 5, start: 1, sort: 'random' },
        headers: {
            'X-Naver-Client-Id': NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
    });
    console.log('Response from Naver API:', response.data);
    res.status(200).json(response.data.items);
} catch (error) {
    console.error('Error fetching data from Naver API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Naver API' });
}

};
*/

// 특정 여행일정에 대한 모든 여행장소 조회
exports.createPlace = async (req, res) => {
    try {
        const { itinerary_id } = req.params;
        const { place_name, address, latitude, longitude, visitdate, contents } = req.body;

        console.log('🛠️ Creating place for itinerary:', req.body);

        const place = await Place.create({
            itinerary_id,
            place_name,
            address,
            latitude,
            longitude,
            visitdate,
            contents,
        });

        res.status(201).json(place);
    } catch (error) {
        console.error('❌ Failed to create place:', error.message);
        res.status(500).json({ error: 'Failed to create place' });
    }
};
/*
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
*/

/*
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
*/

// 특정 여행일정에 새로운 여행장소 추가
exports.createPlace = async (req, res) => {
    try {
        const { itinerary_id } = req.params;
        const { place_name, address, latitude, longitude, visitdate, contents } = req.body;
        const place = await Place.create({
            itinerary_id,
            place_name,
            address,
            latitude,
            longitude,
            visitdate,
            contents,
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

// 특정 여행일정의 글 작성/수정
exports.updateDescription = async (req, res) => {
    try {
        const { itinerary_id } = req.params;
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Description is required.' });
        }

        const itinerary = await Itinerary.findByPk(itinerary_id);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        itinerary.description = description;
        await itinerary.save();

        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update itinerary description' });
    }
};

