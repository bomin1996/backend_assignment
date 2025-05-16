# Auth Server

NestJS 기반의 인증 서버로, 회원가입, 로그인, JWT 기반 인증/인가 기능을 제공합니다.

---

## 🎞️ 기술 스택

- **Framework**: NestJS
- **Database**: MongoDB (Docker 기반)
- **Authentication**: JWT + Passport
- **Authorization**: Role-based access control (USER / OPERATOR / AUDITOR / ADMIN)

---

## ✅ 주요 기능

### 1. 회원가입
- `POST /auth/register`
- 사용자 정보 저장 (`username`, `password`, `role`)
- 비밀번호는 `bcrypt`로 해시해 저장됨

### 2. 로그인
- `POST /auth/login`
- 성공 시 JWT access token 발급

### 3. 내 정보 조회
- `GET /auth/me`
- JWT 인증 필요 (Bearer 토큰 사용)
- 사용자 정보 발환: `userId`, `username`, `role`

---

## 🚀 실행 방법

Docker Compose 환경에서 다음 명령으로 실행합니다:

```bash
docker-compose up --build
```

- auth-server는 `http://localhost:3001` 에서 접근할 수 있습니다.
- MongoDB 연결 URI는 `mongodb://mongo:27017/auth-db` 입니다.
- Mongo 커테이너는 docker-compose의 `mongo` 서비스로 자동 연결됩니다.

---

## 📂 프로젝트 구조

```
auth-server/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   ├── roles.guard.ts
│   │   ├── roles.decorator.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── login-user.dto.ts
│   │   └── schemas/
│   │       └── user.schema.ts
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
| OPERATOR  | 이벤트/보상 등록 가능           |
| AUDITOR   | 보상 요청 내역 조회 가능        |
| ADMIN     | 전체 권한 보유                  |

---

> 작성자: bomin1996
