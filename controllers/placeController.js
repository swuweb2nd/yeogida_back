const { Place } = require('../models');

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