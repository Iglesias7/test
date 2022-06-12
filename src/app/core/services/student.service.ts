import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, share, flatMap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Student} from "../models/student";
import {Observable, of} from "rxjs";
import {Shool} from "../models/shool";

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) {
  }

  public findAll() {
    return this.http.get<Student[]>(`${environment.baseUrl}/students`).pipe(
      map(datas => datas.map(student => new Student(student)))
    );
  }

  public findByName(name: string) {
    const student = new Student({name});
    return this.http.post<Student>(`${environment.baseUrl}/students/find/name`, student).pipe(
      map(data => {
        return new Student(data);
      }),
      catchError(err => of(null))
    );
  }

  public create(student: any): Observable<HttpResponse<Student>> {
    return this.http.post<any>(`${environment.baseUrl}/students`, student);
  }

  public update(student: Shool, id: number): Observable<boolean> {
    return this.http.put<Student>(`${environment.baseUrl}/students/${id}`, student).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public delete(student: Student): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}/students/${student.id}`).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
