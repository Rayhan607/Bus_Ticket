import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BusRoute } from 'src/app/models/data/bus-route';
import { BusRouteEditModel } from 'src/app/models/viewmodels/edit/bus-route-edit-model';
import { BusRouteInputModel } from 'src/app/models/viewmodels/input/bus-route-input-model';
import { AppConstants } from 'src/app/shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<BusRoute[]>{
    return this.http.get<BusRoute[]>(`${AppConstants.apiUrl}/BusRoutes`);
  }
  getWithPoints():Observable<BusRoute[]>{
    return this.http.get<BusRoute[]>(`${AppConstants.apiUrl}/BusRoutes/WithPoints`);
  }
  getById(id:number):Observable<BusRoute>{
    return this.http.get<BusRoute>(`${AppConstants.apiUrl}/BusRoutes/${id}`);
  }
  getWithPointsById(id:number):Observable<BusRoute>{
    return this.http.get<BusRoute>(`${AppConstants.apiUrl}/BusRoutes/${id}/WithPoints`);
  }
  getBordingPoints():Observable<string[]> {
    return this.http.get<string[]>(`${AppConstants.apiUrl}/BusRoutes/Points`);
  }
  insert(data:BusRoute):Observable<BusRoute>{
    return this.http.post<BusRoute>(`${AppConstants.apiUrl}/BusRoutes`, data);
  }
  insertWithPoints(data:BusRouteInputModel):Observable<BusRoute>{
    return this.http.post<BusRoute>(`${AppConstants.apiUrl}/BusRoutes/WithPoints`, data);
  }
  update(data:BusRoute):Observable<any>{
    return this.http.put<any>(`${AppConstants.apiUrl}/BusRoutes/${data.busRouteId}`, data);
  }
  updateWithPoints(data:BusRouteEditModel):Observable<any>{
    return this.http.put<any>(`${AppConstants.apiUrl}/BusRoutes/${data.busRouteId}/WithPoints`, data);
  }
  delete(id:number):Observable<BusRoute>{
    return this.http.delete<BusRoute>(`${AppConstants.apiUrl}/BusRoutes/${id}`);
  }
}
