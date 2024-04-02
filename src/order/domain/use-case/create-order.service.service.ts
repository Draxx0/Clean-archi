import { CreateOrderDto } from 'src/order/domain/dto/create-order.dto';
import { OrderItem } from 'src/order/domain/entity/order-item.entity';
import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

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

    const order = new Order(createOrderDto.customerName, orderItems);

    order.price = order.getOrderTotalPrice();

    return await this.orderRepository.save(order);
  }
}
