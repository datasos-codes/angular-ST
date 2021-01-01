import { Observable } from 'rxjs';

export abstract class ScrapeDeliveryApi {
    abstract getAllReportsByReceivedDates(fDate: any, tDate: any): Observable<any>;
    abstract exportToExcelScrapeDeliveryReports(filterObj: any): Observable<Blob>;
    abstract showSummaryForScrapeDeliveryReports(filterObj: any): Observable<any>;
}
