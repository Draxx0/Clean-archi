import { OrderStatus } from 'aws-sdk/clients/outposts';
import { OrderItem } from '../../../order/domain/entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  constructor(
    customerName: string,
    orderItems: OrderItem[],
    status: 'CART' | 'SHIPPING_ADRESS_SET' = 'CART',
  ) {
    this.customerName = customerName;
    this.orderItems = orderItems;
    this.status = status;
  }

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  shippingAddress: string | null;

  @Column({ nullable: true })
  shippingAddressSetAt: Date | null;

  @Column({
    nullable: true,
    default: 'CART',
    type: 'enum',
    enum: ['CART', 'SHIPPING_ADRESS_SET', 'PAID'],
  })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  paidAt: Date | null;

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + orderItem.getTotalPrice(),
      0,
    );
  }

  setShippingAddress(shippingAddress: string): void {
    if (shippingAddress === '') {
      throw new Error('Shipping address is required');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    this.shippingAddress = shippingAddress;
    this.status = 'SHIPPING_ADRESS_SET';
    this.shippingAddressSetAt = new Date();
  }

  paid(): void {
    if (this.status !== 'SHIPPING_ADRESS_SET') {
      throw new Error('Shipping address is required');
    }
    this.status = 'PAID';
    this.paidAt = new Date();
  }
}
