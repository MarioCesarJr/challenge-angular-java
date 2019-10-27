import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../model/Product';

export interface ProductFilter {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  productsUrl: string;

  constructor(private http: HttpClient) {
    this.productsUrl = `${environment.apiUrl}/products`;
  }

  loadProducts(filter: ProductFilter): Promise<any> {
    let params = new HttpParams();

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    return (
      this.http
        .get<any>(`${this.productsUrl}?`, { params })
        .toPromise()
        // tslint:disable-next-line: no-string-literal
        .then(response => response)
    );
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
