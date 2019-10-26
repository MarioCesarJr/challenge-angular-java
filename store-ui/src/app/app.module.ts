import { PurchaseComponent } from './shop/purchase/purchase.component';
import { NewComponent } from './admin/new/new.component';
import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shop/home/home.component';
import { CartComponent } from './shop/cart/cart.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: NewComponent },
  { path: 'admin/:id', component: NewComponent },
  { path: 'cart/purchase', component: PurchaseComponent }
];

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopModule,
    AdminModule,
    AngularToastifyModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  exports: [AngularToastifyModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {}
