import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';
import { CreateOrderService } from 'src/order/domain/use-case/create-order.service.service';
import OrderRepository from 'src/order/infrastructure/order.repository';
import { GetOrdersByCustomerService } from './domain/use-case/get-orders-by-customer.service';
import { GetOrdersService } from './domain/use-case/get-orders.service';
import { RemoveOrderService } from './domain/use-case/remove-order.service';
import { SetOrderShippingAddressService } from './domain/use-case/set-order-shipping-method.service';
import { PaidOrderService } from './domain/use-case/paid-order.service';
import { OrderController } from './order.controller';
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: GetOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: RemoveOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new RemoveOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: SetOrderShippingAddressService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetOrderShippingAddressService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
    {
      provide: PaidOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PaidOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export class ArticleModule {}
