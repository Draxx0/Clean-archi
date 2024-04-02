import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class PaidOrderService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async paidOrder(id: string): Promise<void> {
    return await this.orderRepository.paidOrder(id);
  }
}
