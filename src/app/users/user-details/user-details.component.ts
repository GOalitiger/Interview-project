import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Shared/sharedService.service';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],

})
export class UserDetailsComponent implements OnInit, OnChanges {

  @Input() UserDetails: any;
  userId: number;
  subscription: Subscription

  userForm: FormGroup;
  constructor(private FormBuilder: FormBuilder,
    private toastr: ToastrService,
    private SharedService: SharedService,
    private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.InitForm();
    this.getUserDetails()
    this.getRouteParam()


  }
  getUserDetails() {
    this.subscription = this.UserService.getUser().subscribe(res => {
       if (res) {
        this.userForm.patchValue(res);
      }


    });
  }
  ngOnChanges() { };

  getRouteParam() {

    this.userId = this.route.snapshot.params['id'];
  }

  InitForm() {
    this.userForm = this.FormBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      createdAt: ['']

    })
    this.userForm.disable();

  }
  routeBack() {
    this.router.navigate(['users'])
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.UserService.clearUser();
  }
}
