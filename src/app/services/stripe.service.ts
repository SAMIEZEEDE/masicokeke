import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private apiUrl = `${environment.apiUrl}/api/payments`;

  constructor(private http: HttpClient) {}

  createPaymentIntent(order: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create-payment-intent`,
      order
    );
  }
}