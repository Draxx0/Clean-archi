import { OrderRepositoryInterface } from '../../../order/domain/port/order.repository.interface';
import { Order } from '../entity/order.entity';

export class PaidOrderService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async paidOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.paid();

    return order;
  }
}
