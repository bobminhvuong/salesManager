import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getGroupProd(): Observable<any> {
    // filter = JSON.stringify(filter);
    let api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + 'api/Product/Group/Get' + api, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreate(sup): Observable<any> {
    sup.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/supplier/add', sup, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  delete(sup): Observable<any> {
    sup.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/supplier/add', sup, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
