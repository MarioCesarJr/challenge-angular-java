import { HttpClient } from '@angular/common/http';
import { ToastService } from 'angular-toastify';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  products = [];
  product = new Product();

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    const idProduct = this.route.snapshot.params['id'];

    if (idProduct) {
      this.loadProduct(idProduct);
    }

    this.loadProducts();
  }

  removeFakepath(url: string) {
    return url.replace('C:\\fakepath\\', '');
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image);

      this.http
        .post('http://localhost:8080/products/image', formData)
        .subscribe(response => console.log('ok'));
    }
  }

  loadProduct(id: number) {
    this.adminService
      .getId(id)
      .then(product => {
        this.product = product;
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  loadProducts() {
    this.adminService
      .loadProducts()
      .then(data => {
        this.products = data;
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  get isEdit() {
    return Boolean(this.product.id);
  }

  save(form: FormControl) {
    if (this.isEdit) {
      this.updateProduct(form);
      form.reset();
    } else {
      this.addProduct(form);
      form.reset();
    }
  }

  addProduct(form: FormControl) {
    this.adminService
      .add(this.product)
      .then(product => {
        this.toastService.success(`Produto ${product.name} adicionado !`);
        this.loadProducts();
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  updateProduct(form: FormControl) {
    this.adminService
      .update(this.product)
      .then(product => {
        this.product = product;
        this.toastService.success(`Produto ${product.name} atualizado !`);
        this.loadProducts();
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  remove(id: number) {
    this.adminService
      .delete(id)
      .then(() => {
        this.toastService.success(`Produto excluído com sucesso !`);
        this.loadProducts();
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  newProduct(form: FormControl) {
    form.reset();

    setTimeout(
      function() {
        this.product = new Product();
      }.bind(this),
      1
    );

    this.loadProducts();
  }
}
