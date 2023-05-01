import { Component, OnInit } from '@angular/core';
import { productamount } from '../product-item/product-item.component';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products!: Product[];

  constructor(private http: ProductsService){

  }

  ngOnInit(){
    this.http.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  addProduct(product: productamount){
    const amount = product.amount;
    const p_id = product.id;
  this.http.addToCart(amount, p_id).subscribe(data => {
      alert("Product added to cart")
    })
  }

}
