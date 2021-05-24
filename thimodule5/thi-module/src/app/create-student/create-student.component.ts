import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "../model/Student";
import {StudentService} from "../service/student.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  editForm: FormGroup = this.formBuilder.group({
    id: [''],
    ten: [''],
    tenNhom: [''],
    tenDeTai: [''],
    giaoVien: [''],
    email: [''],
    sdt: [''],

  });

  student: Student;
  idStudent: number;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private studentService: StudentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idStudent = this.activatedRoute.snapshot.params.id;
    if (this.idStudent) {
      this.studentService.getStudentById(this.idStudent).subscribe(res => {
        this.student = res;
        this.patchValue(this.student);
      });
    }
  }
  submitForm() {
    if (this.editForm.valid) {
      if (!this.idStudent) {
        this.studentService.save(this.editForm.value).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/list');
          }
        });
      } else {
        this.studentService.update(this.idStudent, this.editForm.value).subscribe(res => {
          if (res) {
            this.router.navigateByUrl('/list');
          }
        });
      }
    }
  }

  patchValue(item?: Student): void {
    this.editForm.patchValue({
      id:item.id,
      ten: item.ten,
      tenNhom: item.tenNhom,
      tenDeTai: item.tenDeTai,
      giaoVien: item.giaoVien,
      email: item.email,
      sdt : item.sdt
    });
  }
}
