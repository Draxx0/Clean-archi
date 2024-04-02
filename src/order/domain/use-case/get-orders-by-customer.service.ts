import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class GetOrdersByCustomerService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async getOrdersByCustomer(customerName: string): Promise<Order[]> {
    const orders = this.orderRepository.findByCustomerName(customerName);

    return orders;
  }
}
