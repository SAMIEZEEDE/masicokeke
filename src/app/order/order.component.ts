import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from '../api.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  user:any={
  }
  userDetails:any[]=[];
  orderForm:any={
    brandAndSize:{},
    personalDetails:{},
    shipphingDetails:{},
    paymentDetails:{},
  }
 

  constructor(private store:APIService) { }

  ngOnInit(): void {
    // this.getdata()
  }
  
  Submit(data:any){
    //console.log('data' ,data)
    if(data.formName === "brandForm"){
      this.orderForm.brandAndSize = data.payload
    }
    if(data.formName === "personalDetailsForm"){
      this.orderForm.personalDetails = data.payload
    }
    if(data.formName === "shippingForm"){
      this.orderForm.shipphingDetails = data.payload
    }
    if(data.formName === "paymentForm"){
      this.orderForm.paymentDetails = data.payload
    }
    console.log('orderForm' ,this.orderForm)
    }
   // console.log('form value ',this.loginModel)
  //  console.log('details',formInfo.value)
  //this.user +=formInfo;
  // this.user={
  //   BrandAndSize:this.brand,
  //   personalInfo:this.ItemsModel,
  //   shippingInfo:this.shippingDetails,
  //   paymentInfo:this.cardDetails

  // }
  // }
  DetailsPaerser(){
    this.userDetails.push(this.orderForm)
    console.log('details',this.userDetails)
    this.store.pass(this.userDetails)
  };
  getdata(){
    this.store.getdata().subscribe((res:any)=>{
      console.log(res);
    })
  }

};

