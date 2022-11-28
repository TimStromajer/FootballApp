import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  cname: String = "cookie"

  constructor() { }

  setCookie(username: String) {
    document.cookie = this.cname + "=" + "username=" + username + "; code=neki";
  }

  getCookie() {
    let name = this.cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
