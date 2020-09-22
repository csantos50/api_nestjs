import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ProductService } from './product.service';
import { CartService } from './cart.service';



@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ProductService,CartService],
})
export class ApiModule { }
