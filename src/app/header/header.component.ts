import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { MatDialogComponent } from "../Shared/mat-dialog/mat-dialog.component";
import { SharedService } from "../Shared/sharedService.service";

@Component({
    selector:'app-header' ,
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})
export class Header  implements OnInit,OnDestroy{

    ngOnInit()
    {
        
    }

    constructor(private dialog:MatDialog,
                private sharedService:SharedService,
                private router:Router) { }
    logOut()
    {
        const dialogRef = this.dialog.open(MatDialogComponent, {
            width: '200px',
            height: '200px',
            data: { form: 'logout' }
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result)
            {
                
                this.sharedService.deleteTokenUserLocalStorage();
                this.router.navigate(['login']);
            }
          });
    }
    openLoginScreen() { }
    ngOnDestroy()
    {
        this.sharedService.deleteTokenUserLocalStorage();
        this.router.navigate(['login']);

    }
}