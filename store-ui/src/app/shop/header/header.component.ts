import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../home/home.component';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../../store/cart/reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart: Array<Product>;

  constructor(private ngRedux: NgRedux<InitialState>) {
    this.ngRedux
      .select<Array<Product>>('cart')
      .subscribe((items: Array<Product>) => {
        this.cart = items;
      });
  }

  ngOnInit() {}
}
