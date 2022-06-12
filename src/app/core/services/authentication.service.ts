import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, share, flatMap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Student} from "../models/student";
import {of} from "rxjs";

@Injectable()
export class AuthenticationService {

  public currentUser: Student | null ;

  constructor(private http: HttpClient) {
    const data = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.currentUser = data.id != undefined ? new Student(data) : null;
  }

  authenticate(email: string, password: string): any {

    return this.http.post<any>(`${environment.baseUrl}/auth`, {
      email,
      password
    }).pipe(
      map(user => {
        const student = new Student(user);
        this.login(student);
        return student;
      })
    ).pipe(share());
  }

  storeToken(user: Student): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  hasToken() {
    if(this.currentUser) {
      return true;
    }
    return false;
  }

  getToken() : any {
    if (this.hasToken()) {
      // @ts-ignore
      return this.currentUser.token;
    }
    return false;
  }

  login(student: Student): void {
    if (student.token) {
      this.storeToken(student);
    }
  }

  public findByEmail(email: string) {
    const student = new Student({email});
    return this.http.post<Student>(`${environment.baseUrl}/students/find/email`, student).pipe(
      map(data => {
        return new Student(data);
      }),
      catchError(err => of(null))
    );
  }

  public findByEmailAndPassword(email: string, password:string) {
    const student = new Student({email, password});
    return this.http.post<Student>(`${environment.baseUrl}/students/find/password`, student).pipe(
      map(data => {
        return new Student(data);
      }),
      catchError(err => of(null))
    );
  }

  public create(student: any) {
    const data = {
      username: student.username,
      firstname: student.firstname,
      email: student.email,
      password: student.password
    };
    return this.http.post(`${environment.baseUrl}`, data, {headers: {'Content-Type': 'application/json'}}).pipe(
      flatMap(res => this.authenticate(student.email, student.password))
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
