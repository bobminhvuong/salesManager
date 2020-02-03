import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    // filter = JSON.stringify(filter);
    filter.api =this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/customer/get', filter,this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateCustomer(cus): Observable<any> {
    cus.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/customer/add',cus, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
