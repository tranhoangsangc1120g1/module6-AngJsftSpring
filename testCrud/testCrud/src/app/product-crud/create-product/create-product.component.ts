import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../model/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  editForm: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['']
  });
  product: Product;
  idProduct: number;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.idProduct = this.activatedRoute.snapshot.params.id;
    if (this.idProduct) {
      this.productService.getProductById(this.idProduct).subscribe(res => {
        this.product = res;
        this.patchValue(this.product);
      });
    }
  }


  submitForm() {
    if (this.editForm.valid) {
      if (!this.idProduct) {
        this.productService.save(this.editForm.value).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/list');
          }
        });
      } else {
        this.productService.update(this.idProduct, this.editForm.value).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/list');
          }
        });
      }
    }
  }

  patchValue(item?: Product): void {
    this.editForm.patchValue({
      id: item.id,
      name: item.name,
      description: item.description
    });
  }
}
