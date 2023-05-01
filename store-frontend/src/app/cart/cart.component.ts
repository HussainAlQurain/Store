import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OrderProduct } from '../types/OrderProduct';
import { Product } from '../types/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products_in_order: OrderProduct[] = [];
  products: Product[] = [];
  
  full_name: string = '';
  address: string = '';
  credit_card: string = '';
  constructor(private http: ProductsService, private route: Router ) { }


  getProductDetails(id: number){
    return this.http.getProduct(id).subscribe((data) => {
      this.products.push(data);
    })
  }

  ngOnInit(): void {
     this.http.getCartProducts().subscribe((data) => {
      this.products_in_order = data;
      this.initializeProducts();
    })
  }
  //function that initializes the products array after the products_in_order array is initialized
  //and then calls the getProductDetails function for each product in the products_in_order array
  initializeProducts(){
    this.products_in_order.map((product) => {
      this.getProductDetails(parseInt(product.product_id))
    })
  }
  //function that sends the order details to the server
  onSubmit(){
    this.http.updateOrderStatus().subscribe((data) => {
      console.log(data);
    })
    alert("Order placed successfully!")
    const name = this.full_name;
    const price = this.getTotalPrice();
    this.http.updateOrderToUndefined();
    this.route.navigateByUrl(`/success/${name}/${price}`);
  }
  //function that filters the products_in_order array and the products array
  onRemove(id: number){
    this.products_in_order = this.products_in_order.filter((product) => {
      return product.product_id != id.toString();
    })
    this.products = this.products.filter((product) => {
      return product.id != id;
    })
  }
  //function that removes the product from the cart
  removeFromCart(id: number){
    this.http.deleteProductFromCart(id).subscribe((data) => {
      this.onRemove(id);
    })
  }
  //get the quanity of the product in the cart
  getQuantity(id: number){
    let quantity = this.products_in_order.find((product) => {
      return product.product_id == id.toString();
    })
    return quantity?.quantity;
  }
  //calculate the total price of the products in the cart
  getTotalPrice(){
    try{
    let total = 0;
    this.products_in_order.map((product) => {
      let price = this.products.find((p) => {
        return p.id == parseInt(product.product_id);
      })
      total += price!.price * product.quantity;
    })
    return Math.round(total * 100) / 100;
    }
    catch{
      return 0;
    }
  }
  //change the quantity of the product in the cart
  changeQuantity(id: number, event: any){
    let quantity = event.target.value;
    this.products_in_order.find((product) => {
      if(product.product_id == id.toString()){
        product.quantity = quantity;
      }
    })
    this.http.updateProductQuantity(id, quantity).subscribe((data) => {
    })
  }

}