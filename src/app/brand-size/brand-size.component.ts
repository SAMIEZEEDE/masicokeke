import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-brand-size',
  templateUrl: './brand-size.component.html',
  styleUrls: ['./brand-size.component.scss']
})
export class BrandSizeComponent implements OnInit {
  @Output() newBrandEvent = new EventEmitter<NgForm>();
  brand:any[]=['OMO','SUNLIGHT','MAQ'] 
  sizes:any[]=[]
  
  products = [
  { brand: 'OMO', size: '1kg', price: 24.99 },
  { brand: 'OMO', size: '2kg', price: 39.99 },
  { brand: 'SUNLIGHT', size: '1kg', price: 22.99 },
  { brand: 'SUNLIGHT', size: '2kg', price: 37.99 },
  { brand: 'MAQ', size: '1kg', price: 20.99 },
  { brand: 'MAQ', size: '2kg', price: 34.99 }
];
  chooseSize:any={
    formName:'brandForm',
    payload:[],
  };
  item: any = {
    size:"",
    brand:"",
    quantity:"",
    amount:0,
   }

  constructor() { }

  ngOnInit(): void {
  }
  calculateAmount(): void {

    const selectedSize = this.sizes.find(
      x => x.size === this.item.size
    );

    if (selectedSize) {
      this.item.unitPrice = selectedSize.price
      this.item.amount =
        selectedSize.price * this.item.quantity;
    } else {
      this.item.amount = 0;
    }

  }
  addToCart() {
    this.chooseSize.payload.push(this.item)
    this.item ={
    size:"",
    brand:"",
    quantity:"",
    unitPrice:0,
    amount:0,
   }

  }
  getSelectedBrandSpec(): void {
    const array = this.products.filter(product => {
      return product.brand === this.item.brand;
    });
    this.sizes = array
    console.log("size:",array)
  }
  Submit(formInfo:NgForm){
    this.chooseSize.payload.push(this.item)
    if(formInfo.invalid){
      return;
    }else{
      this.newBrandEvent.emit(this.chooseSize);
    }

  }
}
