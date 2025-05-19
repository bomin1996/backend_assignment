// test/event-flow.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('Daily Gift Event Flow (e2e)', () => {
    let app: INestApplication;
    let server: any;

    let createdEventId: string;
    let createdRewardId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        server = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
    });

    it('1. 이벤트 생성', async () => {
        const res = await request(server)
            .post('/event')
            .send({
                title: '데일리 기프트',
                description: '매일 몬스터 300마리 처치 시 보상 지급',
                repeatable: true,
            })
            .expect(201);

        createdEventId = res.body._id;
        expect(createdEventId).toBeDefined();
        expect(res.body.title).toBe('데일리 기프트');
    });

    it('2. 보상 등록', async () => {
        const res = await request(server)
            .post('/reward')
            .send({
                eventId: createdEventId,
                day: 1,
                description: '주문의 흔적 500개',
            })
            .expect(201);

        createdRewardId = res.body._id;
        expect(createdRewardId).toBeDefined();
        expect(res.body.description).toBe('주문의 흔적 500개');
    });

    it('3. 보상 요청 성공', async () => {
        const res = await request(server)
            .post('/request')
            .send({
                userId: 'user123',
                eventId: createdEventId,
                rewardId: createdRewardId,
            })
            .expect(201);

        expect(res.body.userId).toBe('user123');
        expect(res.body.eventId).toBe(createdEventId);
        expect(res.body.rewardId).toBe(createdRewardId);
    });

    it('4. 중복 보상 요청 방지', async () => {
        const res = await request(server)
            .post('/request')
            .send({
                userId: 'user123',
                eventId: createdEventId,
                rewardId: createdRewardId,
            })
            .expect(400);

        expect(res.body.message).toBe('이미 요청한 보상입니다.');
    });

    it('5. 사용자 보상 이력 조회', async () => {
        const res = await request(server)
            .get(`/request/user/user123`)
            .expect(200);

        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].userId).toBe('user123');
        expect(res.body[0].eventId._id).toBe(createdEventId);
        expect(res.body[0].rewardId._id).toBe(createdRewardId);
    });
});
