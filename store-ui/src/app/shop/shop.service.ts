import { Product } from './home/home.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  productsUrl: string;
  //stockUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = `${environment.apiUrl}/products`;
    //this.stockUrl = `${environment.apiUrl}/stock/:id`;
  }

  loadProducts(): Promise<any> {
    return this.http.get<any>(`${this.productsUrl}`).toPromise();
  }

  // loadStock(id: number): Promise<Product> {
  //   return this.http.get<Product>(`${this.stockUrl}/${id}`).toPromise();
  // }
}
