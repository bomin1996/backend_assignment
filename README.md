# 🎁 Daily Gift Event System - 백엔드 과제

넥슨 메이플스토리 백엔드 과제의 요구사항을 기반으로 이벤트 보상 지급 시스템을 설계하고, 인증 서버와 이벤트 서버로 나누어 구현하였습니다.

## 🗂️ 프로젝트 구조

```
backend_assignment/
├── auth-server/          # 사용자 인증, 권한 관리
├── event-server/         # 이벤트/보상/요청 흐름 처리
└── gateway-server/       # API 게이트웨이 역할 (3000번 포트)
```

---

## 📌 과제 목표

- NestJS 기반 RESTful API 서버 구축
- MongoDB를 사용한 데이터 모델링
- 유저 인증 및 JWT 기반 권한 처리
- 이벤트 보상 흐름 처리 및 중복 요청 방지
- 실제 서비스 흐름을 반영한 E2E 테스트 구현

---

## 🔐 Auth Server

### 주요 기능

- `POST /auth/register`: 사용자 회원가입
- `POST /auth/login`: 로그인 및 JWT 토큰 발급
- `GET /auth/me`: JWT 인증 후 사용자 정보 반환

### 사용 기술

- NestJS
- Mongoose (MongoDB)
- Passport + JWT
- Role-based Access Control

### 고민한 점

- 사용자 권한(`USER`, `ADMIN`, `OPERATOR`, `AUDITOR`)의 명확한 정의와 API 접근 제어 처리
- NestJS의 `@Roles()` 데코레이터와 `RolesGuard`를 통해 선언적 권한 처리 구현
- 보안성을 고려해 비밀번호는 해시처리하여 저장

---

## 🎁 Event Server

### 주요 기능

- `POST /event`: 이벤트 등록
- `PATCH /event/:id`: 이벤트 수정
- `PATCH /event/:id/disable`: 이벤트 비활성화
- `POST /reward`: 보상 등록
- `POST /request`: 유저 보상 요청
- `GET /request/user/:userId`: 유저의 보상 요청 이력 조회

### 사용 기술

- NestJS
- Mongoose (MongoDB)
- Docker / Docker Compose
- Jest + Supertest (E2E)

### 고민한 점

#### 1. 데이터 모델 설계
- Event ↔ Reward ↔ RewardRequest 간의 관계를 명확히 하기 위해 Mongoose의 ObjectId 참조 및 populate를 활용
- 복잡한 연관관계를 단순화하고, DB 설계와 서비스 로직 간 분리를 유지

#### 2. 중복 요청 방지
- 보상 요청(`RewardRequest`) 전에 동일 유저의 요청 이력을 `findOne()`으로 검사하여 중복 방지
- unique index 대신 서비스 단 처리로 단순화

#### 3. 테스트 자동화
- 단일 파일(`event-flow.e2e-spec.ts`)에 이벤트 등록 → 보상 등록 → 요청 흐름을 E2E로 테스트
- Docker로 MongoDB 환경 격리 후 테스트 가능

---

## ✅ 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 도커 컨테이너 실행 (MongoDB 포함)
docker-compose up -d

# 3. 개별 서버 실행
cd auth-server && npm run start:dev
cd event-server && npm run start:dev
cd gateway-server && npm run start:dev

# 4. E2E 테스트 실행
cd event-server && npm run test:e2e
```

---

## 🔎 테스트 흐름 (event-flow.e2e-spec.ts)

1. 이벤트 등록 (예: 데일리 기프트)
2. 해당 이벤트에 대한 보상 등록
3. 유저가 보상 요청
4. 중복 요청 시 차단
5. 보상 요청 이력 조회

---

## 🙋🏻 프로젝트를 하며 배운 점

- 인증과 권한 관리를 분리된 서버에서 처리함으로써 구조적인 확장성과 유지보수를 고려한 아키텍처를 경험할 수 있었습니다.
- NestJS 기반 모듈화, Mongoose의 populate를 통한 문서 참조 등 실무에 가까운 패턴을 체득하였습니다.
- 테스트 자동화를 통해 실제 흐름 상 오류를 사전에 잡을 수 있었고, 테스트 코드의 중요성을 절실히 느꼈습니다.

---

## 🛠 기술 스택

- Node.js / NestJS / TypeScript
- MongoDB / Mongoose
- Passport / JWT
- Docker / Docker Compose
- Jest / Supertest
