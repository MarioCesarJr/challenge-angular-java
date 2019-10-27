import { Component, OnInit } from '@angular/core';
import { removeFromCart, updateAmount } from '../../store/cart/actions';
import { NgRedux } from '@angular-redux/store';
import { Product } from '../home/home.component';
import { InitialState } from '../../store/cart/reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Array<Product>;
  totalCart: number;

  constructor(private ngRedux: NgRedux<InitialState>) {
    this.ngRedux
      .select<Array<Product>>('cart')
      .subscribe((items: Array<Product>) => {
        this.cart = items.map(product => ({
          ...product,
          subtotal: product.price * product.amount
        }));
      });

    this.ngRedux
      .select<Array<Product>>('cart')
      .subscribe((items: Array<Product>) => {
        this.totalCart = items.reduce((total, item) => {
          return total + item.price * item.amount;
        }, 0);
      });
  }

  ngOnInit() {}

  removeFakepath(url: string) {
    return url.match(/[^\\/]*$/)[0];
  }

  removeFromCart(item: Product) {
    this.ngRedux.dispatch(removeFromCart(item));
  }

  increment(item: Product) {
    this.ngRedux.dispatch(updateAmount(item, item.amount + 1));
  }

  decrement(item: Product) {
    this.ngRedux.dispatch(updateAmount(item, item.amount - 1));
  }
}
