import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { SetOrderShippingAddressService } from './set-order-shipping-method.service';

describe('set order shipping address', () => {
  const order = new Order('John Doe', []);

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order with a shipping method', async () => {
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

  it('should throw an error when the shipping address is empty', async () => {
    const setOrderShippingAddressService = new SetOrderShippingAddressService(
      orderRepositoryMock,
    );

    try {
      await setOrderShippingAddressService.setOrderShippingAddress({
        orderId: '123',
        shippingAddress: '',
      });
    } catch (err) {
      expect(err.message).toEqual('Shipping address is required');
    }
  });

  it('should throw an error when the shipping is more than 100 characters', async () => {
    const setOrderShippingAddressService = new SetOrderShippingAddressService(
      orderRepositoryMock,
    );

    try {
      await setOrderShippingAddressService.setOrderShippingAddress({
        orderId: '123',
        shippingAddress:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, orci sed faucibus feugiat, sem nulla dignissim magna, ac maximus ante metus sit amet orci. Duis pharetra at nisl at eleifend. Pellentesque sed orci eu urna volutpat condimentum a et ex. Curabitur ac vulputate ligula, id porta neque. Pellentesque vulputate justo ac ultricies rutrum. Etiam quis maximus ipsum. Nulla imperdiet est orci, scelerisque tristique dui rutrum nec. Fusce euismod viverra diam lacinia suscipit. Donec erat nulla, pellentesque in orci ut, scelerisque sodales ante. Pellentesque a lectus hendrerit, finibus ex at, rhoncus risus.In commodo ipsum elit, quis pharetra quam venenatis non. Aliquam ullamcorper hendrerit lobortis. Integer sed placerat sapien. Nulla ultricies dignissim lorem et gravida. Curabitur velit justo, vulputate vitae justo ultricies, rutrum tincidunt sapien. Vivamus sem metus, finibus at efficitur a, dictum eu augue. Phasellus lacinia, felis vehicula iaculis blandit, sapien nisi consequat sapien, eget rutrum massa ligula eu sem.',
      });
    } catch (err) {
      expect(err.message).toEqual(
        'Shipping address must be less than or equal to 100 characters',
      );
    }
  });
});
