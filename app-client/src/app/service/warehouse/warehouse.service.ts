import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAllWH(): Observable<any> {
    let req = {
      api: this.mainSV.getApikey()
    };
    return this.http.post(environment.APIHOST + '/api/warehouse/Get', req, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateWH(objectWH): Observable<any> {
    objectWH.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/warehouse/Add', objectWH, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteWH(objectWHId): Observable<any> {
    objectWHId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/warehouse/Delete', objectWHId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getTransaction(objectFilter): Observable<any> {
    objectFilter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/transaction/get', objectFilter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getTransactionDetail(object): Observable<any> {
    object.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/transaction/GetDetail', object, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createTransaction(object): Observable<any> {
    let user = this.mainSV.getCurrentUser();
    object.api = user.api;
    object.user_id = user.id;
    return this.http.post(environment.APIHOST + '/api/transaction/Add', object, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteTransaction(objectId): Observable<any> {
    objectId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/transaction/delete', objectId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  confirmRecivedDate(objectId): Observable<any>{
    objectId.api = this.mainSV.getApikey();
    console.log(objectId);
    debugger;
    
    return this.http.post(environment.APIHOST + '/api/transaction/Confirm', objectId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
