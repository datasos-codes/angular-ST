import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { ScrapeDeliveryApi } from '../api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrapedeliveryService implements ScrapeDeliveryApi {
  public headers: any = {
    'content-type': 'application/json'
  };
  private baseUrl = environment.baseUrl;
  private controllerName = 'ScrapeDeliveryReport/';

  constructor(
    private http: HttpClient
  ) { }

  getAllReportsByReceivedDates(fDate: any, tDate: any): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetScrapeDeliveryReports/${fDate}/${tDate}`;
    return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
      map(res => res)
    );
  }

  exportToExcelScrapeDeliveryReports(filterObj: any): Observable<Blob> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}ExportToExcel`;
    return this.http.post(serviceUrl, filterObj, { responseType: 'blob' });
  }

  showSummaryForScrapeDeliveryReports(filterObj: any): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}ScrapeDeliverySummary`;
    return this.http.post(serviceUrl, filterObj, { responseType: 'text' });
  }
}
