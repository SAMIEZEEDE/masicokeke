import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private apiUrl = 'http://localhost:3000/api/payments';

  constructor(private http: HttpClient) {}

  createPaymentIntent(order: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create-payment-intent`,
      order
    );
  }
}