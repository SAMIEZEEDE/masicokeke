import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @Output() newpersonlEvent = new EventEmitter<NgForm>();

  personalDetails:any={
    formName:'personalDetailsForm',
    payload:{
    firstname:"",  
    lastname:"",    
    date:"",    
    age:"", 
    time:"",
    phonenumber:"", 
    }
 };
 
  constructor() { }

  ngOnInit(): void {
  }

  Submit(formInfo:any){
      this.newpersonlEvent.emit(this.personalDetails)
  }

}
