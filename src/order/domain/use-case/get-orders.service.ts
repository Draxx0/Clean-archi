import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class GetOrdersService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async getOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();

    return orders;
  }
}
