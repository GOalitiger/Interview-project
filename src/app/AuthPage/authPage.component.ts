import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthPageService } from "./AuthPage.service";
import jwt_decode from "jwt-decode";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "../Shared/sharedService.service";
import { Router } from "@angular/router";





@Component({
    selector:'app-auth',
    templateUrl:'./authPage.component.html',
    styleUrls:['./authPage.component.css'],
    providers: [AuthPageService]
})

export class AuthPage implements OnInit 
{
    registrationForm = false;
    loginForm :FormGroup;
    formValue:any;
    loading= false;
    errorMsg:string =null; 
    constructor(private fb:FormBuilder,
                private authService:AuthPageService,
                private toastrService:ToastrService,
                private sharedService:SharedService,
                private router:Router){}

    ngOnInit()
    {
        this.InitForm();
    }
    InitForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required,Validators.email]],
            password: ['', [Validators.required,Validators.minLength(6)]]
        })
    }   


    login(f:NgForm)
    {
        this.formValue =this.loginForm.value;
        this.loading = true;
        this.authService.LoginUser(this.formValue.email, this.formValue.password).subscribe(res=>{
            this.loading = false;
            let User = jwt_decode(res['jwt']);
            this.sharedService.SetTokenLocalStorage(res['jwt']);
            this.sharedService.setUserDetailsLocalStorage(JSON.stringify(User))
            let UserDetails =this.sharedService.getUserDetailsLocalStorage();
            let ExpiryDate= new Date(new Date().getTime() + UserDetails['exp']/1000);
            console.log(ExpiryDate);
            this.sharedService.LoggedIn = true;
           
            this.toastrService.success(`${UserDetails['name']} logged in Successfully!`);
            this.router.navigate(['home']);
          
          },
            error => {
              console.log(error);
              this.loading = false;
              this.toastrService.error(error.error.message)
      
        })
       this.loginForm.reset();
    }
    changeToLogin(event:any)
    {
        this.registrationForm = event;

    }
    getErrorMessage(controlName) {
        if (this.loginForm.get(controlName).hasError('required')) {
          return 'Enter a value';
        }
        if (this.loginForm.get(controlName).hasError('email')) {
          return 'Enter a valid email ID'
        }
        if (this.loginForm.get(controlName).hasError('minlength')) {
          return 'Enter at least 6 characters'
        }
    }
}