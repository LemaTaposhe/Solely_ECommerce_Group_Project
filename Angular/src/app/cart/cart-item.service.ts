import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from './cartItem.model';  // Create this interface based on your data model

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }

  // Method to get the latest CartItems
  getLatestCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`http://localhost:5000/api/CartItems/LatestCartItems`);
  }
}
