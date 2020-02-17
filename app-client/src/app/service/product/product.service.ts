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

  getAllProduct(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Get',filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateProduct(objectProduct): Observable<any> {
    objectProduct.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Add', objectProduct, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteProduct(objectProductId): Observable<any> {
    objectProductId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Delete', objectProductId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getBatchByProd(objectProductId): Observable<any> {
    objectProductId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/product/batch/get', objectProductId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateBatch(objectBatch): Observable<any> {
    objectBatch.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/product/batch/add', objectBatch, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteBatch(objectBatchId): Observable<any> {
    objectBatchId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Group/Delete', objectBatchId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getImageProduct(product_id): Observable<any>{
    let req = {
      api: this.mainSV.getApikey(),
      product_id: product_id
    };
    return this.http.post(environment.APIHOST + '/api/Product/GetImage',req, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
