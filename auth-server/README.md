# Auth Server

NestJS 기반의 인증 서버로, 회원가입, 로그인, JWT 기반 인증/인가 기능을 제공합니다.

---

## 📦 기술 스택
- **Framework**: NestJS
- **Database**: MongoDB
- **Authentication**: JWT + Passport
- **Authorization**: Role-based access control (USER / OPERATOR / AUDITOR / ADMIN)

---

## ✅ 주요 기능

### 1. 회원가입
- `POST /auth/register`
- 사용자 정보를 받아 MongoDB에 등록
- 비밀번호는 `bcrypt`로 해싱하여 저장

### 2. 로그인
- `POST /auth/login`
- 등록된 유저의 아이디/비밀번호를 검증
- 유효 시 JWT 토큰 발급

### 3. 인증된 사용자 정보 조회
- `GET /auth/me`
- JWT를 통한 인증 필요 (헤더에 Bearer 토큰 포함)
- 유저의 `userId`, `username`, `role` 반환

### 4. 역할 기반 인가 보호
- `@Roles()` 데코레이터를 사용해 API 접근 제어
- `RolesGuard`로 역할 확인 후 접근 허용/차단

---

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 서버 실행
npm run start
```

MongoDB는 로컬에서 27017 포트로 실행 중이어야 합니다. 

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
├── package.json
└── README.md
```


---

## 👥 이벤트 / 역할 정의

| Role      | 설명                            |
|-----------|---------------------------------|
| USER      | 보상 요청 가능                  |
| OPERATOR  | 이벤트 등록, 보상 등록 가능    |
| AUDITOR   | 지급 내역 조회 가능            |
| ADMIN     | 전체 기능 접근 가능            |

---

> 작성자: bomin1996
