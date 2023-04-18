import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private _notify = new BehaviorSubject<any>({status: 'success', message: 'message', start: false, code: 200});
  notify$ = this._notify.asObservable();

  obNotify(data: any): void {
    console.log(data);
    
    this._notify.next(data);
  }

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
