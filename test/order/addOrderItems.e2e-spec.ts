import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Order } from '../../src/order/domain/entity/order.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '../../src/order/domain/entity/order-item.entity';

describe('Add Order items (e2e)', () => {
  let app: INestApplication;
  let order1: Order;
  let orderItem: OrderItem;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([Order, OrderItem])],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    orderRepository = moduleFixture.get('OrderRepository');
    order1 = new Order('John Doe', []);
    orderItem = new OrderItem('Product 1', 1, 100);
    order1.orderItems.push(orderItem);
    order1.price = order1.getOrderTotalPrice();

    await orderRepository.save(order1);
  });

  it('should add order items', async () => {
    const response = await request(app.getHttpServer())
      .put('/orders/update-order')
      .send({
        orderId: 13,
        orderItems: [
          {
            price: 200,
            productName: 'Product 2',
            quantity: 2,
          },
        ],
      });

    const { body, status } = response;

    console.log(body);
    console.log(status);

    expect(status).toStrictEqual(200);
    expect(body.orderItems.length).toStrictEqual(2);
  });

  it.only('should add update order item quantity', async () => {
    const response = await request(app.getHttpServer())
      .put('/orders/update-order')
      .send({
        orderId: 10,
        orderItems: [
          {
            price: 200,
            productName: 'Product 2',
            quantity: 2,
          },
        ],
      });

    const { body, status } = response;

    console.log(body);
    console.log(status);

    expect(status).toStrictEqual(200);
    expect(body.orderItems.length).toStrictEqual(2);
  });
});
