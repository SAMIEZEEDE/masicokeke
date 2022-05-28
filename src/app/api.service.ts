import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) { }
  pass(data:any){
    console.log(data)
    return this.http.post('https://cl2.io/ebd2d5bc-f69f-4d68-94ee-fca80fee467e/',data).subscribe(res =>{
      console.log(res)
      
    })
  }
  getdata(){
    return this.http.get('https://collect2.com/api/ebd2d5bc-f69f-4d68-94ee-fca80fee467e/datarecord/')
  }
}
