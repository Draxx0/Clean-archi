import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { AddOrderItemService } from './add-order-item.service';

describe('add order item to an existing order', () => {
  const order = new Order('John Doe', []);
  const orderItem = new OrderItem('Product 1', 1, 100);
  order.orderItems.push(orderItem);

  const orderRepositoryMock = {
    findById() {
      return order;
    },
    save(order: Order) {
      return order;
    },
  } as unknown as OrderRepositoryInterface;

  it('should update an order and insert new order items', async () => {
    const addOrderItemService = new AddOrderItemService(orderRepositoryMock);

    const updatedOrder = await addOrderItemService.addOrderItem({
      orderId: order.id,
      orderItems: [
        {
          price: 200,
          productName: 'Product 2',
          quantity: 2,
        },
      ],
    });

    expect(updatedOrder.orderItems.length).toBe(2);
    expect(updatedOrder.getOrderTotalPrice()).toBe(500);
    expect(
      updatedOrder.orderItems.find((item) => item.productName === 'Product 2'),
    ).toBeDefined();
  });

  it('should update an order and update the quantity of an existing order item', async () => {
    const addOrderItemService = new AddOrderItemService(orderRepositoryMock);

    const updatedOrder = await addOrderItemService.addOrderItem({
      orderId: order.id,
      orderItems: [
        {
          price: 100,
          productName: 'Product 1',
          quantity: 2,
        },
      ],
    });

    expect(updatedOrder.orderItems.length).toBe(1);
    expect(updatedOrder.getOrderTotalPrice()).toBe(300);
    expect(updatedOrder.orderItems[0].quantity).toBe(3);
  });
});
