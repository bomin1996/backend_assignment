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

# 3. E2E 테스트 실행
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

- 인증과 권한 관리를 분리된 서버에서 처리함으로써 구조적인 확장성과 유지보수를 고려한 아키텍처를 직접 구성해보는 좋은 기회가 되었습니다. 단일 서버 구조에 익숙했던 제게는 Gateway 패턴을 직접 구현해보며 트래픽 분산 및 보안 설계의 개념을 실습할 수 있었던 점이 인상 깊었습니다.
- NestJS 기반의 모듈화 아키텍처, Mongoose의 populate 기능, DTO, Schema, Guard 등 실무에서 자주 접하지 못했던 Nest의 고유한 구조와 Mongoose의 참조 패턴을 경험하며 실무에 가까운 백엔드 설계 방식을 익힐 수 있었습니다.
- 테스트 자동화의 중요성을 몸소 느낄 수 있었고, 특히 E2E 테스트를 통해 실제 흐름 상 발생할 수 있는 오류를 사전에 방지하는 경험을 하였습니다. 테스트 코드 없이 개발하던 방식에 비해 사후 디버깅 비용이 얼마나 줄어드는지를 체감하였습니다.
- 현재 회사 실무에서는 접하지 못했던 NestJS의 E2E 테스트 구조, 테스트 환경 분리, Docker 기반의 다중 컨테이너 환경 구축 등 새로운 기술들을 직접 구성하며 학습할 수 있어 매우 뜻깊었습니다.
- 이번 과제를 통해 단순히 기능 구현을 넘어 서비스 전반의 흐름을 테스트하고 방어하는 코드 작성의 중요성과 실제 CI/CD 관점에서의 테스트 자동화의 가치를 깊이 인식하게 되었으며, 이러한 경험을 바탕으로 추후 다른 프로젝트에도 적극적으로 테스트를 도입할 계획입니다.
- 본 프로젝트는 제출 이후에도 코드를 계속 유지보수하며, 부족한 테스트 커버리지 보완 및 NestJS 고급 기능들(예: Interceptor, Filter 등)을 추가로 학습하고 리팩토링할 계획입니다. 단순 과제로 끝나는 것이 아니라 꾸준히 개선하며 더 나은 백엔드 개발자로 성장하기 위한 토대로 삼고자 합니다.

---

## 🛠 기술 스택

- Node.js / NestJS / TypeScript
- MongoDB / Mongoose
- Passport / JWT
- Docker / Docker Compose
- Jest / Supertest
