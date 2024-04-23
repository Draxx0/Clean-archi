import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/order.repository.interface';

export class CreateOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderItems = createOrderDto.orderItems.map(
      (orderItem) =>
        new OrderItem(
          orderItem.productName,
          orderItem.quantity,
          orderItem.price,
        ),
    );

    console.log('orderItems', orderItems);

    const order = new Order(createOrderDto.customerName, orderItems);

    console.log('order', order);

    order.price = order.getOrderTotalPrice();

    return await this.orderRepository.save(order);
  }
}
