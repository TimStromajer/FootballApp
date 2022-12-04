import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { CookieManagerService } from '../Cookies/cookie-manager.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  uri: string = environment.FUNCTIONS_URL //http://localhost:9999

  constructor(private http: HttpClient,
    private cookieManagerService: CookieManagerService) {}

  registerUser(username: String, email: String, password: String, code: String) {
    let reqBody = { "username": username, "email": email, "password": password, "code": code }
    let reqHeaders = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<any>(this.uri + "/.netlify/functions/register", reqBody, { headers: reqHeaders})
  }

  checkRegisterCode(code: String) {
    let reqBody = { "code": code }
    let reqHeaders = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<any>(this.uri + "/.netlify/functions/registerCode", reqBody, { headers: reqHeaders})
  }

  loginUser(username: String, password: String) {
    let reqBody = { "username": username, "password": password }
    let reqHeaders = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<any>(this.uri + "/.netlify/functions/login", reqBody, { headers: reqHeaders})
  }

  getUser() {
    console.log("get user")
    let reqHeaders = new HttpHeaders({"token": this.cookieManagerService.getCookie(), "Accept": "*/*"})
    return this.http.get<any>(this.uri + "/.netlify/functions/user", { headers: reqHeaders})
  }
}
