import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { SetOrderShippingAddressService } from './set-order-shipping-method.service';

describe('set order invoicing address', () => {
  const order = new Order('John Doe', []);

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order with an invoicing method ', async () => {
    const setOrderShippingAddressService = new SetOrderShippingAddressService(
      orderRepositoryMock,
    );

    const updatedOrder =
      await setOrderShippingAddressService.setOrderShippingAddress({
        orderId: '123',
        shippingAddress: '123 Main St.',
      });

    expect(updatedOrder.shippingAddress).toBe('123 Main St.');
  });
});
