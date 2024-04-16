import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { PaidOrderService } from './paid-order.service';
import { SetOrderShippingAddressService } from './set-order-shipping-method.service';

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
    const setShippingAddressServiceMock = new SetOrderShippingAddressService(
      orderRepositoryMock,
    );
    const PaidOrderServiceMock = new PaidOrderService(orderRepositoryMock);

    await setShippingAddressServiceMock.setOrderShippingAddress({
      orderId: '123',
      shippingAddress: '123 Main St',
    });

    const updatedOrder = await PaidOrderServiceMock.paidOrder('123');

    console.log(updatedOrder);

    expect(updatedOrder.status).toBe('PAID');
    expect(updatedOrder.paidAt).toBeInstanceOf(Date);
  });
});
