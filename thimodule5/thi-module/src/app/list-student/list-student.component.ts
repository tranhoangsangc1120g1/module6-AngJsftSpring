import {Component, OnInit} from '@angular/core';
import {Student} from "../model/Student";
import {StudentService} from "../service/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  studentList: Student[];

  constructor(private studentService: StudentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.studentService.getStudentList().subscribe(res => {
      console.log(res);
      this.studentList = res;
    });
  }

  editProduct(id: number): void {
    this.router.navigateByUrl(`edit/${id}`);
  }

  deletedProduct(id: number) {
    this.studentService.deleted(id).subscribe(() => {
      this.loadData();
    });
  }
}
