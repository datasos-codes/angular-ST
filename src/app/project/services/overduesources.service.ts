import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverdueSourcesApi } from '../api';
import { OverdueSourcesResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OverduesourcesService implements OverdueSourcesApi {
  public headers: any = {
    'content-type': 'application/json'
  };
  private baseUrl = environment.baseUrl;
  private controllerName = 'OverdueSources/';

  constructor(
    private http: HttpClient
  ) { }

  getAllOverdueSources(): Observable<OverdueSourcesResponse[]> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetOverdueSources`;
    return this.http.get<OverdueSourcesResponse[]>(serviceUrl, { headers: this.headers }).pipe(
      map(res => res)
    );
  }

  exportToExcelOverDuesReports(): Observable<Blob> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}ExportToExcel`;
    return this.http.get(serviceUrl, { responseType: 'blob' });
  }
}
