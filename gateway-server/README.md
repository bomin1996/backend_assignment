# Gateway Server

NestJS 기반의 API 게이트웨이 서버로, 클라이언트의 요청을 수신하여 인증/인가 처리 후 내부 서비스(`auth-server`, `event-server`)로 프록시 라우팅합니다.

---

## 🎞️ 기술 스택

- **Framework**: NestJS
- **Language**: TypeScript
- **Routing**: Axios + HttpModule
- **Auth**: JWT 인증 (Passport + Strategy)
- **RBAC**: 역할 기반 접근 제어 (`@Roles` + `RolesGuard`)

---

## ✅ 주요 기능

### 1. 요청 프록시 처리
- 모든 클라이언트 요청을 gateway에서 수신
- 경로에 따라 `auth-server`, `event-server`로 전달

### 2. JWT 인증
- `Authorization: Bearer <token>` 형식의 JWT 검증
- 사용자 정보 파싱 (userId, username, role)

### 3. 역할 기반 인가
- `@Roles()` 데코레이터와 `RolesGuard`를 통해 API별 접근 제어
- 예: `USER`만 요청 가능, `OPERATOR`만 이벤트/보상 등록 가능 등

---

## 🚀 실행 방법

Docker Compose 환경에서 다음 명령어로 전체 서버를 실행합니다:

```bash
docker-compose up --build
```

- gateway-server는 `http://localhost:3000` 에서 실행됩니다.
- 내부 API는 다음 포트를 사용합니다:
    - auth-server: `3001`
    - event-server: `3002`

---

## 📂 프로젝트 구조

```
gateway-server/
├── src/
│   ├── auth/
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.decorator.ts
│   │   └── roles.guard.ts
│   ├── http.service.ts
│   ├── app.controller.ts
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
| AUDITOR   | 보상 요청 이력 조회 가능        |
| ADMIN     | 전체 권한 보유                  |

---

> 작성자: bomin1996
