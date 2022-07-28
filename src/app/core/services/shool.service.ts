import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, share, flatMap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Student} from "../models/student";
import {Observable, of} from "rxjs";
import {Shool} from "../models/shool";

@Injectable()
export class ShoolService {

  constructor(private http: HttpClient) {
  }

  public findAll() {
    return this.http.get<Shool[]>(`${environment.baseUrl}/shools`).pipe(
      map(datas => datas.map(shool => new Shool(shool)))
    );
  }

  public findByName(name: string) {
    const shool = new Shool({name});
    return this.http.post<Shool>(`${environment.baseUrl}/shool/find/name`, shool).pipe(
      map(data => {
        return new Shool(data);
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

  public findVideo(name: string): Observable<any | null> {
    const shool = new Shool({name});
    return this.http.get<any>(`${environment.baseUrl}/students/video`).pipe(
      map(data => {
        console.log(data)
        return data.responses;
      }),
      catchError(err => of(null))
    );
  }

  public uploadVideo(name: any, file: string | Blob): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', file);
    return this.http.post(`${environment.baseUrl}/students/upload/video`, formData).pipe(
      map(data => {
        console.log("data videos " + data);
        return data;
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public create(shool: any): Observable<HttpResponse<Shool>> {
    return this.http.post<any>(`${environment.baseUrl}/shools`, shool);
  }

  public update(shool: Shool, id: number): Observable<boolean> {
    return this.http.put<Shool>(`${environment.baseUrl}/shools/${id}`, shool).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public delete(shool: Shool): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}/shools/${shool.id}`).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public uploadPicture(name: any, file: string | Blob): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', file);
    return this.http.post(`${environment.baseUrl}/shools/upload`, formData).pipe(
      map(data => {
        return data;
      }),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public confirmPicture(name: any, path: string): Observable<any> {
    console.log(name, path);
    return this.http.post<any>(`${environment.baseUrl}/shools/confirm`, { name, logo: path }).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public cancelPicture(name: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    return this.http.post<any>(`${environment.baseUrl}/shools/cancel`, formData).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }
}
