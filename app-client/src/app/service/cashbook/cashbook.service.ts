import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashbookService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getCashbookSource(): Observable<any> {
    let filter ={
      api : this.mainSV.getApikey()
    };
    return this.http.post(environment.APIHOST + '/api/Cashbook/Source', filter,this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
