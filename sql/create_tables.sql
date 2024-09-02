-- Itinerary 테이블 생성
CREATE TABLE Itineraries (
    itinerary_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    startdate TIMESTAMP NOT NULL,
    enddate TIMESTAMP NOT NULL,
    destination VARCHAR(100) NOT NULL,
    public_private BOOLEAN NOT NULL DEFAULT 0,
    thumbnail VARCHAR(255),
    likenumber BIGINT DEFAULT 0,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Place 테이블 생성
CREATE TABLE Places (
    placelist_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    itinerary_id BIGINT NOT NULL,
    place_name VARCHAR(255) NOT NULL,
    visitdate TIMESTAMP NOT NULL,
    contents TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    photo_url VARCHAR(255),
    address VARCHAR(255),
    place_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (itinerary_id) REFERENCES Itineraries(itinerary_id) ON DELETE CASCADE
);
