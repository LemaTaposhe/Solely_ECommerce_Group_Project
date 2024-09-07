import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../cart/cart-item.service';
import { CartItem } from '../cart/cartItem.model';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.cartItemService.getLatestCartItems().subscribe(
      (data: CartItem[]) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error fetching CartItems:', error);
      }
    );
  }
}
