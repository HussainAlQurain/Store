import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!: number;
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedValue: number = 1;
  constructor(private route: ActivatedRoute, private http: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
    this.http.getProduct(this.id!).subscribe(p => {
      this.product = p;
    })
  }
  addProduct(){
    this.http.addToCart(this.selectedValue, this.product.id!.toString()).subscribe(data => {
      alert('Product added to cart');
    })
  }


}
