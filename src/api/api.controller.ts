import { Controller, Body, Get, Param, Logger, Inject } from "@nestjs/common";
import { Post } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { ApiService } from "./api.service";

@Controller('api')

export class ApiController {
    constructor(private apiService: ApiService) { }

    @Get('products')
    async getProduct(){
        return await this.apiService.getallProducts();
    ;}


    @Post('products')
    async addProduct(
        @Body('name') name: string,
        @Body('price') price: number,
    ){
        const prodId = await this.apiService.createProduct({name, price});

        return {
            id: prodId
        };
    }
    
}
