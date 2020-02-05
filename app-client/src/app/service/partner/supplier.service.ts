import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(): Observable<any> {
    // filter = JSON.stringify(filter);
    let api = this.mainSV.getApikey();
    return this.http.get(environment.APIHOST + '/api/Supplier/Get?api=' + api, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreate(suplierObj): Observable<any> {
    suplierObj.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/supplier/add', suplierObj, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  delete(SuplierObjId): Observable<any> {
    SuplierObjId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/supplier/Delete', SuplierObjId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
