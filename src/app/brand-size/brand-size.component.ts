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
  chooseSize:any={
    formName:'brandForm',
    payload:{
    size:'one',
    brand:'',
    amount:'',
   }

  };

  constructor() { }

  ngOnInit(): void {
  }
  Submit(formInfo:NgForm){
    if(formInfo.invalid){
      return;
    }else{
      this.newBrandEvent.emit(this.chooseSize);
    }

  }
}
