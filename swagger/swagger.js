const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Yeogida",
            version: "1.0.0",
            description: "SWUWEB YEOGIDA API 문서",
        },
        servers: [
            {
                url: "https://yeogida.net/",
            },
        ],
        components: {
            schemas: {
                Place: {
                    type: "object",
                    properties: {
                        place_id: {
                            type: "integer",
                            description: "DB 내 고유 장소 ID",
                            example: 1
                        },
                        name: {
                            type: "string",
                            description: "장소 이름",
                            example: "에펠탑"
                        },
                        address: {
                            type: "string",
                            description: "장소 주소",
                            example: "파리, 프랑스"
                        },
                        latitude: {
                            type: "number",
                            format: "float",
                            description: "위도 좌표",
                            example: 48.858844
                        },
                        longitude: {
                            type: "number",
                            format: "float",
                            description: "경도 좌표",
                            example: 2.294351
                        },
                        description: {
                            type: "string",
                            description: "장소 설명",
                            example: "파리의 랜드마크 중 하나로 유명한 철탑"
                        },
                        itinerary_id: {
                            type: "integer",
                            description: "연관된 여행일정 ID",
                            example: 2
                        }
                    },
                    required: ["name", "address", "latitude", "longitude", "itinerary_id"]
                },
                Itinerary: {
                    type: "object",
                    properties: {
                        itinerary_id: {
                            type: "integer",
                            description: "여행일정 ID",
                            example: 1
                        },
                        user_id: {
                            type: "integer",
                            description: "사용자 ID",
                            example: 10
                        },
                        title: {
                            type: "string",
                            description: "여행일정 제목",
                            example: "유럽 여행"
                        },
                        startdate: {
                            type: "string",
                            format: "date-time",
                            description: "여행 시작 날짜",
                            example: "2024-08-01T00:00:00Z"
                        },
                        enddate: {
                            type: "string",
                            format: "date-time",
                            description: "여행 종료 날짜",
                            example: "2024-08-15T23:59:59Z"
                        },
                        destination: {
                            type: "string",
                            description: "여행 목적지",
                            example: "프랑스, 독일, 이탈리아"
                        },
                        public_private: {
                            type: "boolean",
                            description: "공개 여부",
                            example: true
                        },
                        thumbnail: {
                            type: "string",
                            description: "썸네일 이미지 URL",
                            example: "https://example.com/thumbnail.jpg"
                        },
                        likenumber: {
                            type: "integer",
                            description: "좋아요 수",
                            example: 25
                        },
                        description: {
                            type: "string",
                            description: "여행일정 설명",
                            example: "2주간의 유럽 여행 일정"
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            description: "생성 날짜",
                            example: "2024-07-01T12:00:00Z"
                        },
                        updated_at: {
                            type: "string",
                            format: "date-time",
                            description: "마지막 수정 날짜",
                            example: "2024-07-10T12:00:00Z"
                        }
                    },
                    required: ["title", "startdate", "enddate", "destination", "public_private"]
                },
                GetItinerariesRequest: {
                    type: "object",
                    properties: {
                        user_id: {
                            type: "integer",
                            description: "사용자 ID",
                            example: 10
                        },
                        public_private: {
                            type: "boolean",
                            description: "공개 여부 (true=공개, false=비공개)",
                            example: true
                        },
                        destination: {
                            type: "string",
                            description: "여행 목적지",
                            example: "프랑스"
                        },
                        startdate: {
                            type: "string",
                            format: "date",
                            description: "여행 시작 날짜 (YYYY-MM-DD)",
                            example: "2024-08-01"
                        },
                        enddate: {
                            type: "string",
                            format: "date",
                            description: "여행 종료 날짜 (YYYY-MM-DD)",
                            example: "2024-08-15"
                        },
                        sort: {
                            type: "string",
                            description: "정렬 기준 (newest: 최신순, oldest: 오래된 순)",
                            enum: ["newest", "oldest"],
                            example: "newest"
                        },
                        type: {
                            type: "string",
                            description: "일정 유형 (mine: 내가 만든 일정, shared: 공유받은 일정)",
                            enum: ["mine", "shared"],
                            example: "mine"
                        }
                    },
                    required: ["user_id"]
                }
            }
        }
    },

    apis: ["./routes/*.js", './swagger/*.js'],  // swagger 디렉토리 내의 파일 포함
}

const specs = swaggerJSDoc(options);

module.exports = { swaggerUi, specs };
