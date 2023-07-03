import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPage } from './AuthPage/authPage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Header } from './header/header.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './AuthPage/register/register.component';
import { AuthPageService } from './AuthPage/AuthPage.service';
import { LoaderComponent } from './Shared/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { MatDialogComponent } from './Shared/mat-dialog/mat-dialog.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserService } from './users/users.service';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';
import { AuthInterceptorService } from './Auth-Interceptor/auth-Interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthPage,
    Header,
    UsersComponent,
    RegisterComponent,
    LoaderComponent,
    HomeComponent,
    MatDialogComponent,
    UserDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule, 
    HttpClientModule, 
    MatButtonModule, 
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      // timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,

    }),
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    MatDialogComponent
  ],
  providers: [UserService,
    { provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
