import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { License } from './license/license.model';
// import { UserSoftware } from './UserSoftware';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'http://localhost:3434/api/login/authenticate';
  check(userName:string,password:string):Observable<Boolean>{
    const c = {userName,password};
    return this.http.post<Boolean>(this.url,c);
  }
  constructor(public http:HttpClient) { }
  
  // baseurl:string='http://localhost:3434/api/request/all';
  // getPurchaseDetails(license:any,uname:string){
  //   const e={license,uname};
  //   return this.http.post(this.baseurl,e);
  // }
  // baseurl: string = 'http://localhost:3434/api/request/create';
  // user:any;
  // // Modify the function to accept licenses and username as parameters
  // getPurchaseDetails(licenses: License, username: string): Observable<any> {
  //   console.log(licenses);
  //   this.user = new UserSoftware(licenses.id,licenses.licenseKey,licenses.softwareName,licenses.expiryDate,username);
  //   const data = { licenses, username };
  //  // Send a POST request to your server with the data
  //   return this.http.post(this.baseurl, this.user);
  // }

}
