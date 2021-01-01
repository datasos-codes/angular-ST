import { Observable } from 'rxjs';
import { ParentSourceResponse, UpdateChildSourceRequest, UpdateParentSourceRequest } from '../models';

export abstract class SourcesStatusApi {

    // SourceStatus Controller APIs
    abstract getParentSourceDetails(): Observable<ParentSourceResponse[]>;
    abstract getChildSourceDetailsBySourceId(sId: number): Observable<any>;
    abstract getAllStateName(): Observable<any>;
    abstract getAllOwners(): Observable<any>;
    abstract getSourceListByStateId(stateId: number): Observable<any>;
    abstract getMultipleSourceDetails(sourcesObj: any): Observable<any>;
    abstract insertMultipleSources(sourcesObj: any): Observable<any>;

    // SourceInfo Controller APIs
    abstract displayParentSourcesBySourceId(sourceId: number): Observable<UpdateParentSourceRequest[]>;
    abstract updateParentSourcesBySourceId(parentSourcesObj: any): Observable<UpdateParentSourceRequest[]>;

    // UpdateInfo Controller APIs
    abstract displayChildSourcesBySourceUpdateId(sourceUpdateId: number): Observable<UpdateChildSourceRequest[]>;
    abstract updateChildSourcesBySourceUpdateId(childSourcesObj: any): Observable<UpdateChildSourceRequest[]>;
    abstract getAllStatusForChildSource(): Observable<any>;
    abstract deleteChildSourceBySourceUpdateId(sourceUpdateId: any): Observable<UpdateChildSourceRequest[]>;

    // Irregular source names APIs
    abstract getIrregularSources(): Observable<any[]>;
    abstract addEditIrregularSources(addEditIrregularSourcesData: any): Observable<any[]>;
}
