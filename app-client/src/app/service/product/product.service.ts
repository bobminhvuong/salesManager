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
    let req = {
      api: this.mainSV.getApikey()
    };
    return this.http.post(environment.APIHOST + '/api/Product/Group/Get',req, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateGroupProd(objectGroup): Observable<any> {
    objectGroup.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Group/Add', objectGroup, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteGroup(objectGroupId): Observable<any> {
    objectGroupId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Group/Delete', objectGroupId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
  
}
