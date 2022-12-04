import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  cname: String = "token"
  cookieObtained: Boolean = false;

  constructor() { }

  setCookie(token: String) {
    this.cookieObtained = true;
    document.cookie = this.cname + "=" + "bearer=" + token
  }

  getCookie() {
    let name = this.cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie.indexOf(name) == 0) {
      return decodedCookie.substring(name.length, decodedCookie.length)
    }
    return "";
  }
}
