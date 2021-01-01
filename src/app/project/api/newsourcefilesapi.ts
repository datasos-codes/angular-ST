import { Observable } from 'rxjs';

export abstract class NewSourcefilesApi {
    abstract getAllActiveSourceNames(): Observable<any>;
    abstract insertMultipleSourceFiles(sourcesFileObj: any): Observable<any>;
    abstract dragAndDropFiles(filename: any): Observable<any>;
}
