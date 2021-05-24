import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListStudentComponent} from "./list-student/list-student.component";
import {CreateStudentComponent} from "./create-student/create-student.component";


const routes: Routes = [
  {path: 'list', component: ListStudentComponent},
  {path: 'create', component: CreateStudentComponent},
  {path: 'edit/:id', component: CreateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
