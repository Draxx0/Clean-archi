import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/order.repository.interface';
import { AddOrderItemDto } from '../dto/add-order-item.dto';
import { HttpException } from '@nestjs/common';

export class AddOrderItemService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async addOrderItem(addOrderItemDto: AddOrderItemDto): Promise<Order> {
    const { orderId, orderItems } = addOrderItemDto;

    const order = await this.orderRepository.findById(String(orderId));

    console.log('order', order);

    if (!order) {
      throw new HttpException('Order nout found', 404);
    }

    const newOrderItems = orderItems.map(
      (orderItem) =>
        new OrderItem(
          orderItem.productName,
          orderItem.quantity,
          orderItem.price,
        ),
    );

    order.addOrderItems(newOrderItems);

    console.log('merged items', order.orderItems);

    order.price = order.getOrderTotalPrice();

    console.log('total price after merge', order.price);

    return await this.orderRepository.save(order);
  }
}
