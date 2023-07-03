import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { testRoute } from "../Shared/sharedConstant";

// @Injectable({providedIn: 'root'})
@Injectable()

export class AuthPageService{

    constructor(private http : HttpClient){}

    registerUser(name:string, email:string, password:string)
    {
         let body ={
            name: name,
            email: email,
            password:password
        }
        return this.http.post(testRoute.prodRoute+'register', body)

    }
    LoginUser(email:string,password:string)
    {
      let body={
          email: email,
          password:password
      }
      return this.http.post(testRoute.prodRoute+'login',body)

    }
}