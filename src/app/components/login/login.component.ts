import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from 'src/app/services/Cookies/cookie-manager.service';
import { UserManagerService } from 'src/app/services/User/user-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String = "";
  password: String = "";

  errMsg: String = ""

  constructor(private cookieManagerService: CookieManagerService, private userManagerService: UserManagerService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.username.length < 1 || this.password.length < 1) {
      this.errMsg = "Polji Uporabniško ime in geslo sta obvezni";
    } else {
      this.userManagerService.loginUser(this.username, this.password)
        .subscribe(data => {
          if (data.jwt != null) {
            this.cookieManagerService.setCookie(data.jwt)
            this.router.navigate(['']);
          } else {
            this.errMsg = "Uporabniško ime ali geslo ni pravilno."
          }
        })
    }
  }

}
