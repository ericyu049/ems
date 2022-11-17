import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    login(request: any) {
        return this.http.post('/api/auth/login', request, { reportProgress: true, responseType: "json" });
    }
    checkLoggedin() {
        return this.http.post('/api/auth/isLoggedin', { reportProgress: true, responseType: "json" });
    }
    isAdmin() {
        return this.http.post('/api/auth/isAdmin', { reportProgress: true, responseType: "json" });
    }
    refreshToken() {
        return this.http.post('/api/auth/refreshToken', { reportProgress: true, responseType: "json" });
    }
    logout() {
        return this.http.post('/api/auth/logout', { reportProgress: true, responseType: 'json' });
    }
}