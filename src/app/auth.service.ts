import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }



  signUp(endpoint:any,params:any){
    return this.http.post(environment.URL + endpoint,params)
  }

  signIn(endpoint:any,params:any){
   return  this.http.post(environment.URL + endpoint,params)
  }


  otpChecker(endpoint:any,params:any){
    return this.http.post(environment.URL + endpoint,params)
  }

  allUsers(endpoint:any){
    return this.http.get(environment.URL + endpoint)
  }
}
