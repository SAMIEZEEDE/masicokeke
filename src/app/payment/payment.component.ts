import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Output() newPaymentEvent = new EventEmitter<NgForm>();
  paymentDetails:any={
    formName:'paymentForm',
    payload:{
      cardNumber:'',
      cvc:'',
      cardName:'',
      cardExpiry:'',
    }
   
  }

  constructor() { }

  ngOnInit(): void {
  }

  Submit(cardDetails:any){
      this.newPaymentEvent.emit(this.paymentDetails);
    }

  

}
