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
}
