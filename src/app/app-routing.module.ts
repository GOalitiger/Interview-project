import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './AuthGuard/auth.guard';
import { AuthPage } from './AuthPage/authPage.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'', redirectTo: '/login',pathMatch:'full'},
  {
    path:'login', 
    component: AuthPage,
    canActivate:[AuthGuard],
    
  },
  {
    path:'home', 
    component: HomeComponent,
    canActivate:[AuthGuard]},
  { 
    path:'users', 
    component: UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'user-details/:id',
    component:UserDetailsComponent,
    canActivate:[AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
