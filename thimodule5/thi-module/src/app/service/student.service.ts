import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../model/Student";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  private API_URL = "http://localhost:8080/studentList";

  getStudentList(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.API_URL);
  }

  save(item: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.API_URL + "/create", item);
  }

  getStudentById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.API_URL}/${id}`);
  }

  update(id: number, item: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.API_URL}/edit/${id}`, item);
  }

  deleted(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleted/${id}`);
  }
}
