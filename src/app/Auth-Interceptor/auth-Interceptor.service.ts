import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SharedService } from "../Shared/sharedService.service";



@Injectable({providedIn:'root'})

export class  AuthInterceptorService implements HttpInterceptor{
    constructor(private sharedService: SharedService){}
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        const headers = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.sharedService.getTokenLocalStorage()}` 
            },
        );
        const modifiedReq = req.clone({
            headers:headers
        });
        return next.handle(modifiedReq);

    }
}