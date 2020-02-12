import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAllStore(): Observable<any> {
    let req = {
      api: this.mainSV.getApikey()
    };
    return this.http.post(environment.APIHOST + '/api/store/get',req, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateStore(objectStore): Observable<any> {
    objectStore.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Unit/Add', objectStore, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteStore(objectStoreId): Observable<any> {
    objectStoreId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Unit/Delete', objectStoreId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
  
}
