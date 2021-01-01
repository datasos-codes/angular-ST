import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewSourcefilesApi } from '../api';

@Injectable({
  providedIn: 'root'
})
export class NewsourcefilesService implements NewSourcefilesApi {
  public headers: any = {
    'content-type': 'application/json',
  };
  private baseUrl = environment.baseUrl;
  private controllerName = 'SourceFile/';

  constructor(
    private http: HttpClient
  ) { }

  getAllActiveSourceNames(): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetActiveSources`;
    return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
      map(sourceListRes => sourceListRes)
    );
  }

  insertMultipleSourceFiles(sourcesFileObj: any): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}SaveChanges`;
    return this.http.post<any>(serviceUrl, sourcesFileObj, { headers: this.headers }).pipe(map(res => res));
  }

  dragAndDropFiles(filename): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetSourceFileDetailsFromFiles`;
    return this.http.post<any>(serviceUrl, filename, { headers: this.headers }).pipe(
      map(fileRes => fileRes)
    );
  }
}
