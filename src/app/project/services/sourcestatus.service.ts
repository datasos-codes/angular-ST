import { Injectable } from '@angular/core';
import { SourcesStatusApi } from '../api';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { UpdateParentSourceRequest, ParentSourceResponse, UpdateChildSourceRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SourcestatusService implements SourcesStatusApi {
  public headers: any = {
    'content-type': 'application/json'
  };
  private baseUrl = environment.baseUrl;
  private controllerName = 'SourceStatus/';
  private sourceInfoControllerName = 'SourceInfo/';
  private sourceUpdateInfoControllerName = 'UpdateInfo/';
  getAllStateList: any;
  getOwners: any;
  stateNamesObservable: any;
  ownersObservable: any;
  getChildSourceStatusObservable: any;

  constructor(
    private http: HttpClient
  ) { }

  // SourceStatus Controller APIs

  getParentSourceDetails(): Observable<ParentSourceResponse[]> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetAllSources/0`;
    return this.http.get<ParentSourceResponse[]>(serviceUrl, { headers: this.headers }).pipe(
      map(res => res)
    );
  }

  getChildSourceDetailsBySourceId(sId: number): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetAllUpdates/${sId}`;
    return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
      map(res => res)
    );
  }

  getAllStateName(): Observable<any> {
    if (this.stateNamesObservable) {
      return of(this.stateNamesObservable);
    } else {
      const serviceUrl = `${this.baseUrl}${this.controllerName}GetStateName`;
      return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
        map(res => {
          this.stateNamesObservable = res;
          return this.stateNamesObservable;
        }), publishReplay(1), refCount(),
      );
    }
  }

  getAllOwners(): Observable<any> {
    if (this.ownersObservable) {
      return of(this.ownersObservable);
    } else {
      const serviceUrl = `${this.baseUrl}${this.controllerName}GetOwners`;
      return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
        map(res => {
          this.ownersObservable = res;
          return this.ownersObservable;
        }), publishReplay(1), refCount(),
      );
    }
  }

  getSourceListByStateId(stateId: number): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetSourceList/${stateId}`;
    return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
      map(sourceListRes => sourceListRes)
    );
  }

  getMultipleSourceDetails(sourcesObj: any): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetMultipleSourceDetails`;
    return this.http.post<any>(serviceUrl, sourcesObj, { headers: this.headers }).pipe(map(res => res));
  }

  insertMultipleSources(sourcesObj: any): Observable<any> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}MultipleInsertSource`;
    return this.http.post<any>(serviceUrl, sourcesObj, { headers: this.headers }).pipe(map(res => res));
  }

  // SourceInfo Controller APIs

  displayParentSourcesBySourceId(sourceId: number): Observable<UpdateParentSourceRequest[]> {
    const serviceUrl = `${this.baseUrl}${this.sourceInfoControllerName}GetSourceData/${sourceId}`;
    return this.http.get<UpdateParentSourceRequest[]>(serviceUrl, { headers: this.headers }).pipe(
      map(res => res)
    );
  }

  updateParentSourcesBySourceId(parentSourcesObj: any): Observable<UpdateParentSourceRequest[]> {
    const serviceUrl = `${this.baseUrl}${this.sourceInfoControllerName}UpdateSourceData`;
    return this.http.post<UpdateParentSourceRequest[]>(serviceUrl, parentSourcesObj, { headers: this.headers }).pipe(map(res => res));
  }

  // UpdateInfo Controller APIs

  displayChildSourcesBySourceUpdateId(sourceUpdateId: number): Observable<UpdateChildSourceRequest[]> {
    const serviceUrl = `${this.baseUrl}${this.sourceUpdateInfoControllerName}GetUpdateInfo/${sourceUpdateId}`;
    return this.http.get<UpdateChildSourceRequest[]>(serviceUrl, { headers: this.headers }).pipe(
      map(res => res)
    );
  }

  updateChildSourcesBySourceUpdateId(childSourcesObj: any): Observable<UpdateChildSourceRequest[]> {
    const serviceUrl = `${this.baseUrl}${this.sourceUpdateInfoControllerName}SaveUpdateInfo`;
    return this.http.post<UpdateChildSourceRequest[]>(serviceUrl, childSourcesObj, { headers: this.headers }).pipe(map(res => res));
  }

  getAllStatusForChildSource(): Observable<any> {
    if (this.getChildSourceStatusObservable) {
      return of(this.getChildSourceStatusObservable);
    } else {
      const serviceUrl = `${this.baseUrl}${this.sourceUpdateInfoControllerName}GetStatuses`;
      return this.http.get<any>(serviceUrl, { headers: this.headers }).pipe(
        map(res => {
          this.getChildSourceStatusObservable = res;
          return this.getChildSourceStatusObservable;
        }), publishReplay(1), refCount(),
      );
    }
  }

  deleteChildSourceBySourceUpdateId(sourceUpdateId: any): Observable<UpdateChildSourceRequest[]> {
    const serviceUrl = `${this.baseUrl}${this.sourceUpdateInfoControllerName}DeleteChildSource/${sourceUpdateId}`;
    return this.http.post<UpdateChildSourceRequest[]>(serviceUrl, null, { headers: this.headers }).pipe(map(res => res));
  }

  // Irregular source names APIs
  getIrregularSources(): Observable<any[]> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}GetIrregularSources`;
    return this.http.get<any[]>(serviceUrl, { headers: this.headers }).pipe(map(res => res));
  }

  addEditIrregularSources(addEditIrregularSourcesData: any): Observable<any[]> {
    const serviceUrl = `${this.baseUrl}${this.controllerName}UpsertIrregularSource`;
    return this.http.post<any[]>(serviceUrl, addEditIrregularSourcesData, { headers: this.headers }).pipe(map(res => res));
  }
}
