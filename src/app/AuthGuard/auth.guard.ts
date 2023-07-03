import { Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../Shared/sharedService.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements OnInit,CanActivate{

    constructor(private sharedService: SharedService,
                private Router:Router )
    {}
    ngOnInit()
    {
    }
        
    canActivate(route:ActivatedRouteSnapshot,sate:RouterStateSnapshot):boolean
    {
        if(route.url[0].path =='login')
        {
            if(this.sharedService.getTokenLocalStorage())
            {
                this.Router.navigate(['home']);
                return false;
            }
           
            return true;
        }

        if(this.sharedService.getTokenLocalStorage())
        { return true;
        }
        this.Router.navigate(['login']);
        return false;
       
    }
    
}