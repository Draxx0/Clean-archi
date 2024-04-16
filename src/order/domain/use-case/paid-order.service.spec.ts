import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { PaidOrderService } from './paid-order.service';

describe('set order as paid', () => {
  const order = new Order('John Doe', []);

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order to paid status and update paidAt', async () => {
    const paidOrderService = new PaidOrderService(orderRepositoryMock);

    order.setShippingAddress('123 Main St.');

    const updatedOrder = await paidOrderService.paidOrder('123');

    expect(updatedOrder.status).toBe('PAID');
    expect(updatedOrder.paidAt).toBeInstanceOf(Date);
  });
});
