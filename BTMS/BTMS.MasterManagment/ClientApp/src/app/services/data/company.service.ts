import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/data/company-model';
import { AppConstants } from 'src/app/shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }
  getByKey(key:string): Observable<Company> {
      return this.http.get<Company>(`${AppConstants.apiUrl}/Companies/Info/${key}`);
  }
}
