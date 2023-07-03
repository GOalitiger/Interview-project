import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { testRoute } from "../Shared/sharedConstant";

// interface user{
//     id
//     name:string,

// }

@Injectable()
export class UserService {
    accessToken = localStorage.getItem('Token');

    userDetails = new BehaviorSubject<any>(null);
    currentUser= null;
    constructor(private http: HttpClient) { }

    emitUser(user: any) {
        this.userDetails.next(user);
    }
    clearUser() {
        this.userDetails.next(null);
    }
    getUser():Observable<any> {
        return this.userDetails.asObservable();
    }


    setUserDetails(details:any)
    {   
        this.currentUser = details;

    }
    clearUserDetails()
    {
        this.currentUser =null;
    }
    getUserdetials()
    {
        return this.currentUser;
    }
    getUsers(queryParam: any, filterParam?: string) {
        let queryUrl = `users?page=${queryParam['page']}&size=${queryParam['size']}&sortOrder=${queryParam['sortOrder']}&sortBy=${queryParam['sortBy']}`

        if (filterParam) {
            queryUrl += filterParam
        }
        const headers = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
        );


        return this.http.get(testRoute.prodRoute + queryUrl, { headers: headers });
        //     return this.http.get( +'',)
    }
    storeUser() {

    }
    deleteUser() {
        this.http
    }


}