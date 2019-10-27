import { HttpClient } from '@angular/common/http';
import { ToastService } from 'angular-toastify';
import { AdminService } from './../admin.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  @ViewChild('inputFile', { static: false }) inputFileReset: ElementRef;

  products = [];
  nameText: string;
  formValidate: FormGroup;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadFormValidate();
    // tslint:disable-next-line: no-string-literal
    const idProduct = this.route.snapshot.params['id'];

    if (idProduct) {
      this.loadProduct(idProduct);
    }

    this.loadProducts();
  }

  loadFormValidate() {
    this.formValidate = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      description: [],
      price: [null, Validators.required],
      image: ['empty.jpg']
    });
  }

  removeFakepath(url: string) {
    return url.match(/[^\\/]*$/)[0];
  }

  confirmDelete(id: number) {
    if (confirm('Você tem certeza que deseja exluir este produto ')) {
      this.remove(id);
    }
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      this.formValidate.get('image').setValue(image.name);
      this.http
        .post('http://localhost:8080/products/image', formData)
        .subscribe(response => console.log('ok'));
    }
  }

  loadProduct(id: number) {
    this.adminService
      .getId(id)
      .then(product => {
        this.formValidate.patchValue(product);
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  loadProducts() {
    this.adminService
      .loadProducts({ name: this.nameText })
      .then(data => {
        this.products = data;
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  get isEdit() {
    return Boolean(this.formValidate.get('id').value);
  }

  save() {
    if (this.isEdit) {
      this.updateProduct();
      this.formValidate.reset();
    } else {
      this.addProduct();
      this.formValidate.reset();
    }
  }

  addProduct() {
    this.adminService
      .add(this.formValidate.value)
      .then(product => {
        this.toastService.success(`Produto ${product.name} adicionado !`);
        this.inputFileReset.nativeElement.value = '';
        this.formValidate.get('image').setValue('empty.jpg');
        this.loadProducts();
      })
      .catch(err =>
        this.toastService.error('Ocorreu um erro, por favor tente mais tarde.')
      );
  }

  updateProduct() {
    this.adminService
      .update(this.formValidate.value)
      .then(product => {
        this.formValidate.patchValue(product);
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

  newProduct() {
    this.formValidate.reset();

    setTimeout(
      function() {
        this.product = new Product();
      }.bind(this),
      1
    );
    this.inputFileReset.nativeElement.value = '';
    this.formValidate.get('image').setValue('empty.jpg');
    this.loadProducts();
  }
}
