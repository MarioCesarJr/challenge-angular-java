import { ToastService } from 'angular-toastify';
import { ShopService } from '../shop.service';
import { Component, OnInit, Input } from '@angular/core';
import { addToCart } from '../../store/cart/actions';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../../store/cart/reducer';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  amount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];
  amount;
  stock;
  stockAmount;

  constructor(
    private shopService: ShopService,
    private ngRedux: NgRedux<InitialState>,
    private spinner: NgxSpinnerService,
    private toastService: ToastService
  ) {
    this.ngRedux
      .select<Array<Product>>('cart')
      .subscribe((items: Array<Product>) => {
        this.amount = items.reduce((amount, item) => {
          amount[item.id] = item.amount;
          return amount;
        }, {});
      });
  }

  inCart = false;
  @Input() product: Product;

  ngOnInit() {
    this.spinner.show();

    this.shopService
      .loadProducts()
      .then(products => {
        this.products = products;
        this.spinner.hide();
      })
      .catch(err => {
        this.spinner.hide(),
          this.toastService.error(
            'Ocorreu um erro, por favor tente mais tarde.'
          );
      });
  }

  removeFakepath(url: string) {
    return url.match(/[^\\/]*$/)[0];
  }

  addToCart(item: Product) {
    this.ngRedux.dispatch(addToCart(item));
    this.inCart = true;
  }
}
