import { Product } from './../home/home.component';
import { InitialState } from './../../store/cart/reducer';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
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
}
