import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaidOrderService } from '../domain/use-case/paid-order.service';
import { GetOrdersService } from '../domain/use-case/get-orders.service';
import { Order } from '../domain/entity/order.entity';
import { CreateOrderService } from '../domain/use-case/create-order.service';
import { CreateOrderDto } from '../domain/dto/create-order.dto';
import { GetOrdersByCustomerService } from '../domain/use-case/get-orders-by-customer.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly paidOrderService: PaidOrderService,
    private readonly getOrdersService: GetOrdersService,
    private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
    private readonly createOrderService: CreateOrderService,
  ) {}

  @Put(':id/paid')
  async paidOrder(@Param('id') id: string): Promise<void> {
    return await this.paidOrderService.paidOrder(id);
  }

  @Post()
  async createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return await this.createOrderService.createOrder(body);
  }

  @Get()
  async getOrders(): Promise<Order[]> {
    return await this.getOrdersService.getOrders();
  }

  @Get(':customerName')
  async getOrdersByCustomer(
    @Param('customerName') customerName: string,
  ): Promise<Order[]> {
    return await this.getOrdersByCustomerService.getOrdersByCustomer(
      customerName,
    );
  }
}
