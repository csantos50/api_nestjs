import { Injectable, Logger } from '@nestjs/common';
import { Transport, ClientProxy,ClientProxyFactory } from '@nestjs/microservices'



@Injectable()
export class CartService {
    private client: ClientProxy;

    constructor(){
      this.client=ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8878,
        }
      })
    }
  async getCartDetail(data){
    return await this.client.send('cart',data);
  }
  async getCart(data){
    console.log(data)
    return await this.client.send('getCart',data);
  }
  async getall(){
    return await this.client.send<any>('all',{});
  }
  async getCartUser(data){
    return await this.client.send('getCartUser',data);
  }
  async createCart(data){
    return await this.client.send('createCart',data);
  }
  async addProductToCart (data){
    console.log(data)
    return await this.client.send('addproduct',data);
  }
  async removeProductToCart (data){
    console.log(data)
    return await this.client.send('delete',data);
  }
}


