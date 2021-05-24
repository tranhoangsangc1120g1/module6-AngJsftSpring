import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListProductComponent} from './product-crud/list-product/list-product.component';
import {CreateProductComponent} from './product-crud/create-product/create-product.component';


const routes: Routes = [
  {path: 'list', component: ListProductComponent},
  {path: 'create', component: CreateProductComponent},
  {path: 'edit/:id', component: CreateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
