import {Component, OnInit} from '@angular/core';
import {Product} from '../model/Product';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  productList: Product[];
  selected = 'name';
  ITEMS = ['id', 'name', 'description'];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getProductList().subscribe(res => {
      console.log(res);
      this.productList = res;
    });
  }

  editProduct(id: number): void {
    this.router.navigateByUrl(`edit/${id}`);
  }

  deletedProduct(id: number) {
    this.productService.deleted(id).subscribe(() => {
      this.loadData();
    });
  }

  search(keywords: string) {
    console.log(keywords, this.selected);
    this.productService.search(keywords, this.selected).subscribe(res => {
      this.productList = res;
    });
  }
}
