import { ShopService } from './shop.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { ShopReducer, InitialState, initialState } from '../store/cart/reducer';
import { PurchaseComponent } from './purchase/purchase.component';

@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    HeaderComponent,
    PurchaseComponent,
    PurchaseComponent
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, NgReduxModule],
  exports: [HeaderComponent, CartComponent, HomeComponent, PurchaseComponent],
  providers: [ShopService]
})
export class ShopModule {
  constructor(ngRedux: NgRedux<InitialState>) {
    ngRedux.configureStore(ShopReducer, initialState);
  }
}
