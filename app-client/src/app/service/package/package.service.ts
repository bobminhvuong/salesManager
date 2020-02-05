import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAllTypePack(): Observable<any> {
    let req = {
      api: this.mainSV.getApikey()
    };

    return this.http.post(environment.APIHOST + '/api/Product/Specification/Get', req, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateTypePack(objectTypePack): Observable<any> {
    objectTypePack.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Specification/Add', objectTypePack, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteTypePack(objectTypePackId): Observable<any> {
    objectTypePackId.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/Product/Specification/Delete', objectTypePackId, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
  
}
