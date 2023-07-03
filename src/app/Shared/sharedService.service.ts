import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { testRoute } from "./sharedConstant";

@Injectable({ providedIn: 'root' })
export class SharedService implements OnDestroy {

    constructor(private http: HttpClient) { }
    currentUser: any = null
    LoggedIn = false;
    autoLogin() {
        if (this.getTokenLocalStorage()) {
            this.LoggedIn = true;
        }
    }
    getCurrentUser() {
        return this.currentUser
    }
    setCurrentUser(user: any) {
        this.currentUser = user;
    }


    SetTokenLocalStorage(Token: string) {
        localStorage.setItem('Token', Token);
    }
    getTokenLocalStorage() {
        return localStorage.getItem('Token');

    }
    deleteTokenUserLocalStorage() {
        localStorage.clear();
        this.LoggedIn = false;
    }
    setUserDetailsLocalStorage(User: string) {
        localStorage.setItem('userdetails', User)
    }
    getUserDetailsLocalStorage() {
        return JSON.parse(localStorage.getItem('userdetails'));
    }


    getPosts(queryParam: any, filterParam?: string) {

        let queryUrl = `posts?page=${queryParam['page']}&size=${queryParam['size']}&sortOrder=${queryParam['sortOrder']}&sortBy=${queryParam['sortBy']}`

        if (filterParam) {
            queryUrl += filterParam
        }

        return this.http.get(testRoute.prodRoute + queryUrl);
    }
    storePost(body: any) {

        return this.http.post(testRoute.prodRoute + 'posts', body);
    }
    updatePost(body: any, postId: number) {

        return this.http.put(testRoute.prodRoute + 'posts/' + postId, body);
    }
    deletePost(postId: number) {

        return this.http.delete(testRoute.prodRoute + 'posts/' + postId);

    }

    deleteUser() {
        let userId = this.getUserDetailsLocalStorage()['userId'];
        return this.http.delete(testRoute.prodRoute + 'users/' + userId);
    }
    ngOnDestroy() {
        this.deleteTokenUserLocalStorage();
    }
    logout() { }
}