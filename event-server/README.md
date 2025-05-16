# Event Server

NestJS 기반의 이벤트 서버로, 이벤트 등록/조회, 보상 등록/조회, 사용자 보상 요청 기능을 제공합니다.

---

## 📦 기술 스택
- **Framework**: NestJS
- **Database**: MongoDB
- **Language**: TypeScript
- **API Style**: RESTful API

---

## ✅ 주요 기능

### 1. 이벤트 기능
- `POST /event` : 이벤트 등록 (OPERATOR / ADMIN)
- `GET /event` : 전체 이벤트 조회
- `GET /event/:id` : 특정 이벤트 조회
- `PATCH /event/:id` : 이벤트 정보 수정 (OPERATOR / ADMIN)
- `PATCH /event/:id/disable` : 이벤트 비활성화 처리

### 2. 보상 기능
- `POST /reward` : 보상 등록 (OPERATOR / ADMIN)
- `GET /reward` : 전체 보상 목록 조회

### 3. 보상 요청 기능
- `POST /request` : 사용자 보상 요청 (USER)
- `GET /request` : 전체 요청 목록 조회 (ADMIN / AUDITOR)
- `GET /request/user/:userId` : 사용자 요청 이력 조회

---

## 🚀 실행 방법

```bash
# Docker Compose 기준 루트에서 실행
npm install -g @nestjs/cli

docker-compose up --build
```

- `http://localhost:3002` 에서 이벤트 서버 API 접근 가능
- MongoDB는 `mongo` 서비스로 연결 (포트 27017)

---

## 📂 프로젝트 구조

```
event-server/
├── src/
│   ├── event/
│   ├── reward/
│   ├── request/
│   └── app.module.ts
├── Dockerfile
├── package.json
└── README.md
```

---

## 👥 역할 정의

| Role      | 설명                            |
|-----------|---------------------------------|
| USER      | 보상 요청 가능                  |
| OPERATOR  | 이벤트 등록, 보상 등록 가능    |
| AUDITOR   | 지급 내역 조회 가능            |
| ADMIN     | 전체 기능 접근 가능            |

---

> 작성자: bomin1996
