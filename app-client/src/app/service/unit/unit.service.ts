import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(): Observable<any> {
    let req = {
      api: this.mainSV.getApikey()
    };
    return this.http.post(environment.APIHOST + '/api/Product/Unit/Get',req, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreate(objectUnit): Observable<any> {
    objectUnit.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Unit/Add', objectUnit, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  delete(objectUnitId): Observable<any> {
    objectUnitId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Unit/Delete', objectUnitId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
  
}
