import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { StripeService } from '../services/stripe.service';
import { firstValueFrom } from 'rxjs';
import {
  loadStripe,
  Stripe,
  StripeElements,
  StripeElementsOptions,
  StripePaymentElement
} from '@stripe/stripe-js';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  user: any = {
  }
  userDetails: any[] = [];
  orderForm: any = {
    brandAndSize: {},
    personalDetails: {},
    shipphingDetails: {},
    paymentDetails: {},
  }
  stripe: Stripe | null = null;
  elements!: StripeElements;
  paymentElement!: StripePaymentElement;
  clientSecret!: string;

  constructor(private store: APIService, private snackBar: MatSnackBar, private StripeService: StripeService) { }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripePublishableKey);
  }
  delete(index: number): void {
    this.orderForm.brandAndSize.splice(index, 1);

    this.snackBar.open('Item successfully deleted', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  calculateGrandTotal(index: number) {
    console.log(this.orderForm.brandAndSize[index]);
  }
  adjustQuantity(item: any, action: string, index: number): void {
    if (item.quantity > 1 && action == "remove") {
      item.quantity--;
    }
    if (action == "add") {
      item.quantity++;
    }
    item.amount = item.quantity * item.unitPrice;
    this.orderForm.brandAndSize[index].amount = item.amount;

  }


  Submit(data: any) {
    if (data.formName === "brandForm") {
      this.orderForm.brandAndSize = data.payload
    }
    if (data.formName === "personalDetailsForm") {
      this.orderForm.personalDetails = data.payload
    }
    if (data.formName === "shippingForm") {
      this.orderForm.shipphingDetails = data.payload
    }
    if (data.formName === "paymentForm") {
      this.orderForm.paymentDetails = data.payload;
    }
    console.log('orderForm', this.orderForm)
  }

  async initializePayment() {

    try {

      const response: any = await firstValueFrom(
        this.StripeService.createPaymentIntent({
          items: this.orderForm.brandAndSize
        })
      );

      this.clientSecret = response.clientSecret;

      this.elements = this.stripe!.elements({
        clientSecret: this.clientSecret
      });

      this.paymentElement = this.elements.create('payment');

      this.paymentElement.mount('#payment-element');

    } catch (error) {
      console.error(error);
    }

  }
  async SubmitPayment() {

  const { error, paymentIntent } = await this.stripe!.confirmPayment({
    elements: this.elements,
    redirect: 'if_required'
  });

  if (error) {
    console.error(error);
    return;
  }

  if (paymentIntent?.status === 'succeeded') {

    console.log('Payment Successful');

    // Save order here
    this.saveOrder(paymentIntent.id);

  }

}
saveOrder(paymentIntentId:string){

    const order = {

    customer: this.orderForm.personalDetails,

    shipping: this.orderForm.shipphingDetails,

    items: this.orderForm.brandAndSize,

    payment: {
      paymentIntentId,
      status: 'paid'
    }

  };

  this.store.createOrder(order).subscribe({
    next: (response) => {
      console.log(response);
      this.snackBar.open('Order saved successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['green-snackbar']
    });
    },
    error: (error) => {
      console.error(error);
    }
  });
};
  getdata() {
    this.store.getdata().subscribe((res: any) => {
      console.log(res);
    })
  }

};

