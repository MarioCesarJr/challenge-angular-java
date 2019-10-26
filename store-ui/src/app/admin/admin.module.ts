import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const routes: Routes = [
  { path: 'admin', component: NewComponent },
  { path: 'admin/:id', component: NewComponent }
];

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CurrencyMaskModule
  ],
  exports: [NewComponent]
})
export class AdminModule {}
