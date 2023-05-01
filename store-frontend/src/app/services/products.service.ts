import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../types/product';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../types/decodedToken';
import { OrderProduct } from '../types/OrderProduct';
import { Order } from '../types/order';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private order: string | undefined;

  constructor(private productHttp: HttpClient) { }

  //get product details by id
  getProduct(id: number): Observable<Product> {
    return this.productHttp.get<Product>(`/api/products/${id}`)
  }

  getProducts(): Observable<Product[]> {
    return this.productHttp.get<Product[]>("/api/products")
  }
  //for testing
  addProducts(p: Product): Observable<Product[]> {
    return this.productHttp.post<Product[]>("/api/products/create", p)
  }

  getJson(): Observable<Product[]> {
    return this.productHttp.get<Product[]>('../../assets/data.json')
  }

  //get the token from local storage and decode it
  //then return the user id
  getUserId(): number {
    let token: string = localStorage.getItem('token')!;
    let decoded: DecodedToken = jwt_decode(token);
    return decoded["user"]["id"];
  }

  //get the order id by the user id
  getOrderId(): Observable<Order> {
    let userId = this.getUserId();
    return this.productHttp.get<Order>(`/api/orders/${userId}`)
  }

  //create a new order if the user doesn't have one
  createOrder(): Observable<Order> {
    let userId = this.getUserId();
    return this.productHttp.post<Order>(`/api/orders/create`, {
      status: 'active',
      user_id: userId
    })
  }
  //update the order status to completed
  updateOrderStatus(): Observable<Order> {
    let userId = this.getUserId();
    return this.productHttp.put<Order>(`/api/orders/${this.order}`, {
      status: 'completed',
      user_id: userId
    })
  }

  // add the product to the cart
  addToCart(quantity: number, productId: string): Observable<OrderProduct> {
    let userId = this.getUserId();

    if (this.order == undefined) {
      return this.getOrderId().pipe(
        tap(data => {
          this.order = data.id?.toString();
        }),
        catchError(err => {
          if (err.status == 404) {
            console.log('create new order')
          }
          return this.createOrder().pipe(
            tap(data => {
              this.order = data.id?.toString();
            })
          )
        }),
        switchMap(() => {
          return this.productHttp.post<OrderProduct>(`/api/orders/${this.order}/products`, {
            quantity: quantity,
            orderId: this.order,
            productId: productId
          })
        })
      )
    }
  return this.productHttp.post<OrderProduct>(`/api/orders/${this.order}/products`, {
      quantity: quantity,
      orderId: this.order,
      productId: productId
    })
  }

  //get the products in the cart
  getCartProducts(): Observable<OrderProduct[]> {
    let userId = this.getUserId();
    //get the order id
    return this.getOrderId().pipe(
      tap(data => {
        this.order = data.id?.toString();
      }),
      switchMap(() => {
        //get the products id in the cart
        return this.productHttp.get<OrderProduct[]>(`/api/orders/${this.order}/products`)
      })
    )
  }
  //delete the product from the cart
  deleteProductFromCart(id: number): Observable<OrderProduct> {
    return this.productHttp.delete<OrderProduct>(`/api/orders/${this.order}/products/${id}`)
  }

  //update the quantity of the product in the cart
  updateProductQuantity(id: number, quantity: number): Observable<OrderProduct> {
    return this.productHttp.put<OrderProduct>(`/api/orders/${this.order}/products/${id}`, {
      quantity: quantity
    })
  }
  updateOrderToUndefined() {
    this.order = undefined;
  }
  
}
