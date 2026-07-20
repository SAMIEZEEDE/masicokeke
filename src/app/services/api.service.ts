import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
 private apiUrl = `${environment.apiUrl}/api/orders`;
  constructor(private http:HttpClient) { }
  pass(data:any){
    return this.http.post('https://cl2.io/ebd2d5bc-f69f-4d68-94ee-fca80fee467e/',data).subscribe(res =>{
      
    })
  }
  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  getdata(){
    return this.http.get('https://collect2.com/api/ebd2d5bc-f69f-4d68-94ee-fca80fee467e/datarecord/')
  }
}
