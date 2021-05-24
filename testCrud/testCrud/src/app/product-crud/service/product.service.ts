import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) {
  }

  private API_URL = 'http://localhost:3000/productList';

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API_URL);
  }

  save(item: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URL, item);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_URL}/${id}`);
  }

  update(id: number, item: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.API_URL}/${id}`, item);
  }

  deleted(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }

  search(keyword: string, options: string): Observable<Product[]> {
    const apiCustomize: string = this.API_URL + `?${options}_like=` + keyword;
    return this.httpClient.get<Product[]>(apiCustomize);
  }
}
