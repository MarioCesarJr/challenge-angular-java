import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  productsUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = `${environment.apiUrl}/products`;
  }

  loadProducts(): Promise<any> {
    return this.http.get<any>(`${this.productsUrl}`).toPromise();
  }

  add(product: Product): Promise<Product> {
    return this.http.post<Product>(this.productsUrl, product).toPromise();
  }

  update(product: Product): Promise<Product> {
    return this.http
      .put<Product>(`${this.productsUrl}/${product.id}`, product)
      .toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http
      .delete(`${this.productsUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  getId(id: number): Promise<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`).toPromise();
  }
}
