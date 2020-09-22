import { Injectable, Logger } from '@nestjs/common';
import { Transport, ClientProxy,ClientProxyFactory } from '@nestjs/microservices'



@Injectable()
export class ProductService {
    private client: ClientProxy;

    constructor(){
      this.client=ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        }
      })
    }
  async createProduct(data){
    return await this.client.send('add',data);
  }
  async getallProducts(){
    return await this.client.send('all',{});

  }
  async findproductByName(data){
    return await this.client.send('find',data);
  }
    
}


