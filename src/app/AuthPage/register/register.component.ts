import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthPageService } from '../AuthPage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() loginEmitter = new EventEmitter<any>();;

  RegisterForm: FormGroup
  values: any
  loading = false;
  errorMsg: string = null;

  constructor(private FormBuilder: FormBuilder,
    private AuthpageService: AuthPageService,
    private toastrService:ToastrService) { }

  ngOnInit() {
    this.InitForm();
  }
  InitForm() {
    this.RegisterForm = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }

  register(f) {

    this.values = this.RegisterForm.value;
    this.loading = true;
    this.AuthpageService.registerUser(this.values.name, this.values.email, this.values.password).subscribe(res => {
       this.loading = false;
       this.toastrService.success('You registered successfully,Now you can Login!');
      this.emitLogin();
    },
      error => {
        console.log(error);
        this.loading = false;
        this.toastrService.error('Registration Failed!')
        alert(error);
        this.errorMsg = error.error.message;
      });
    this.RegisterForm.reset();
  }
  getErrorMessage(controlName) {
    if (this.RegisterForm.get(controlName).hasError('required')) {
      return 'Enter a value';
    }
    if (this.RegisterForm.get(controlName).hasError('email')) {
      return 'Enter a valid email ID'
    }
    if (this.RegisterForm.get(controlName).hasError('minlength')) {
      return 'Enter at least 6 characters'
    }
}
  emitLogin() {
    this.loginEmitter.emit(false);
  }
}
