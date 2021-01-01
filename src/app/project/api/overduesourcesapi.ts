import { Observable } from 'rxjs';
import { OverdueSourcesResponse } from '../models';

export abstract class OverdueSourcesApi {
    abstract getAllOverdueSources(): Observable<OverdueSourcesResponse[]>;
    abstract exportToExcelOverDuesReports(): Observable<Blob>;
}
