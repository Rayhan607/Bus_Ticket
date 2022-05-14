import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/data/bus.model';
import { AppConstants } from 'src/app/shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Bus[]>{
    return this.http.get<Bus[]>(`${AppConstants.apiUrl}/Buses`);
  }
  getById(id:number):Observable<Bus>{
    return this.http.get<Bus>(`${AppConstants.apiUrl}/Buses/${id}`);
  }
  insert(bus:Bus):Observable<Bus>{
    return this.http.post<Bus>(`${AppConstants.apiUrl}/Buses`, bus);
  }
  update(bus:Bus):Observable<any>{
    return this.http.put<any>(`${AppConstants.apiUrl}/Buses/${bus.busId}`, bus);
  }
  delete(id:number):Observable<Bus>{
    return this.http.delete<Bus>(`${AppConstants.apiUrl}/Buses/${id}`);
  }
}
