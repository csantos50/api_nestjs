import { Injectable, Logger } from '@nestjs/common';
import { Transport, ClientProxy,ClientProxyFactory } from '@nestjs/microservices'



@Injectable()
export class ApiService {
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
  public createProduct(data){
    console.log(data)
    const obj=this.client.send('products/',data);
    
    console.log(obj)
    return obj;
  }
  public getallProducts(){
    console.log('obj')
    return this.client.send<any>('products/',[]);

  }
}


