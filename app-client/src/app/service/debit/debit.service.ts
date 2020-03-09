import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebitService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getDebitHistory(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Debit/Supplier/History', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getDebitSupplier(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Debit/Supplier', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  addOrEditDebitSupplier(object): Observable<any> {
    object.api = this.mainSV.getApikey();
    let us = this.mainSV.getCurrentUser();
    object.user_id = us.id;
    return this.http.post(environment.APIHOST + '/api/Debit/Supplier/Add', object, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }


  deleteDebitSupplier(objectId): Observable<any> {
    objectId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Debit/Supplier/Delete', objectId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
