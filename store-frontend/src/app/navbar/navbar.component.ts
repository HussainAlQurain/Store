import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, private http: ProductsService, private location: Location) {}


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
