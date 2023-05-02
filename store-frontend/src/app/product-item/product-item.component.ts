import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../types/product';
export type productamount = {amount: number, id: string};

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent  {

  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedValue = 1;
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<productamount>();
  constructor() { 
    this.product = {
      id:0,
      name: 'test',
      price: 20,
      url: 'test',
      description: ''
    }
  }


  addProduct(amount: number, p_id: number){
    const pid = p_id.toString();
    this.addToCart.emit({amount: amount, id: pid});
  }

}
