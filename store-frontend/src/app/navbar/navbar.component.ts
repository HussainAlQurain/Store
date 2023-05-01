import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, forkJoin, map, tap, throwError, timeout } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private http: ProductsService, private location: Location) {}

  ngOnInit(){
    
  }

  addProduct() {
    this.http.getJson().pipe(tap(products => {
      products.map(p => this.http.addProducts(p).subscribe(() => {
        console.warn(p, " Has been added");
      }))
    })).subscribe(() => {
      location.reload();
    })
  }

}
