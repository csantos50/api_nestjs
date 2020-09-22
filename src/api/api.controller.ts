import { Controller, Body, Get, Param, Logger, Inject, NotFoundException } from "@nestjs/common";
import { Post } from '@nestjs/common';
import { ProductService } from "./product.service";
import { CartService } from "./cart.service";
import { strict } from "assert";

@Controller('api')

export class ApiController {
    constructor(private productService: ProductService, private cartService: CartService) { }

    @Get('products')
    async getProduct() {
        return await this.productService.getallProducts();
        ;
    }
    @Get('carts')
    async getCarts() {
        return await this.cartService.getall();
        ;
    }
    @Get('cart/:id')
    async getCart(@Param('id') id: string  ) {
        let cart;
        cart=  await this.cartService.getCart(id);

        if (!cart) {
            return new NotFoundException('Cart not find.');
        }
        const cartDetails= await this.cartService.getCartDetail(id);
        
        return cartDetails;
    }


    @Post('product')
    async addProduct(
        @Body('name') name: string,
        @Body('price') price: number,
    ) {
        const prodId = await this.productService.createProduct({ name, price });

        return {
            id: prodId
        };
    }

    @Post('cart')
    async addProductToCart(
        @Body('product_name') product_name: string,
        @Body('user') user: number,
    ) {
        let cart;
        let prod;
        prod = await this.productService.findproductByName(product_name);
        if (!prod) {
            return new NotFoundException('Product not find.');
        }
        cart = await this.cartService.getCartUser(user);
  
        if (!cart) {
            cart.id = await this.cartService.createCart(user);
        } 
        const data= {
            card:cart.id,
            product:prod.id,
            price:prod.price,
            qnt:1};
        const obj= await this.cartService.addProductToCart(data)
        return obj;
    }

    @Post('cart/remove')
    async remove_ProductToCart(
        @Body('product_name') product_name: string,
        @Body('user') user: number,
    ) {
        let cart;
        let prod;
        prod = await this.productService.findproductByName(product_name);
        if (!prod) {
            return new NotFoundException('Product not find.');
        }
        cart = await this.cartService.getCartUser(user);
  
        if (!cart) {
            return new NotFoundException('Cart not find.');
        } 
        const data= {
            card:cart.id,
            product:prod.id,
        }
        const obj= await this.cartService.removeProductToCart(data)
        return obj;
    }

}
