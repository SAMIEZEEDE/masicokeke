import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  @Output() newshippingEvent = new EventEmitter<NgForm>();

  shippingDetails:any={
    formName:"shippingForm",
    payload:{
      houseNumber:'',
      streetAddress:'',
      town:'',
      areaCode:'',
    }
   
  
    }

  constructor() { }

  ngOnInit(): void {
  }
  Submit(formInfo:any){
    this.newshippingEvent.emit(this.shippingDetails)
  }

}
