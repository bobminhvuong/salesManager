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
    return this.http.post(environment.APIHOST + '/api/warehouse/Get',req, this.mainSV.getHttpOptionsNotToken()).pipe(
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
  
}
