import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Get Order by customer (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get an order by customer', async () => {
    const response = await request(app.getHttpServer()).get(`/orders/william`);

    const { body, status } = response;

    expect(status).toStrictEqual(200);

    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  });
});
