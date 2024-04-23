import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderItemDto } from './create-order.dto';

export class AddOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
