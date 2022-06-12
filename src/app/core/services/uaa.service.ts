import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, share, flatMap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Student} from "../models/student";
import {Observable, of} from "rxjs";
import {Shool} from "../models/shool";
import {Uaa} from "../models/uaa";

@Injectable()
export class UaaService {

  constructor(private http: HttpClient) {
  }

  public findAll() {
    return this.http.get<Uaa[]>(`${environment.baseUrl}/uaas`).pipe(
      map(datas => datas.map(uaa => new Uaa(uaa)))
    );
  }

  public findByName(name: string) {
    const uaa = new Uaa({name});
    return this.http.post<Uaa>(`${environment.baseUrl}/uaas/find/name`, uaa).pipe(
      map(data => {
        return new Uaa(data);
      }),
      catchError(err => of(null))
    );
  }

  public create(uaa: any): Observable<HttpResponse<Uaa>> {
    return this.http.post<any>(`${environment.baseUrl}/uaas`, uaa);
  }

  public update(uaa: Uaa, id: number): Observable<boolean> {
    return this.http.put<Uaa>(`${environment.baseUrl}/uaas/${id}`, uaa).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public delete(uaa: Uaa): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}/uaas/${uaa.id}`).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
