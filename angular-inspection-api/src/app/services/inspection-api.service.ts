import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  baseApiUrl:string = environment.baseApiUrl;
  url: string = "https://localhost:44367";

  constructor(private http:HttpClient) { }

  //Inspections
  getInspectionList():Observable<any[]> {
    return this.http.get<any>(this.url + '/api/inspections');
  }

  addInspection(data: any) {
    return this.http.post(this.url + '/api/inspections', data);
  }

  updateInspection(data:any) {
    return this.http.put(this.url + `/api/inspections`, data);
  }

  deleteInspection(id:number|string) {
    return this.http.delete(this.url + `/api/inspections/${id}`);
  }

  //InspectionTypes
  getInspectionTypesList():Observable<any[]> {
    return this.http.get<any>(this.baseApiUrl + '/api/inspectiontypes');
  }

  addInspectionTypes(data: any) {
    return this.http.post(this.baseApiUrl + '/api/inspectiontypes', data);
  }

  updateInspectionTypes(id:number|string, data:any) {
    return this.http.put(this.baseApiUrl + `/api/inspectiontypes/${id}`, data);
  }

  deleteInspectionTypes(id:number|string) {
    return this.http.delete(this.baseApiUrl + `/api/inspectiontypes/${id}`);
  }

  //Status
  getStatusList():Observable<any[]> {
    return this.http.get<any>(this.baseApiUrl + '/api/status');
  }

  addStatus(data: any) {
    return this.http.post(this.baseApiUrl + '/api/status', data);
  }

  updateStatus(id:number|string, data:any) {
    return this.http.put(this.baseApiUrl + `/api/status/${id}`, data);
  }

  deleteStatus(id:number|string) {
    return this.http.delete(this.baseApiUrl + `/api/status/${id}`);
  }
}
