import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from 'src/app/services/Cookies/cookie-manager.service';
import { UserManagerService } from 'src/app/services/User/user-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: String = ""
  code: String = ""
  password: String = "";
  email: String = "";
  check1: boolean = false;
  check2: boolean = false;
  check3: boolean = false;

  errMsg: String = ""
  errMsgCheck: String = ""

  constructor(private cookieManagerService: CookieManagerService,
    private userManagerService: UserManagerService,
    private router: Router) { 
  }

  ngOnInit(): void {
  }

  registrationCodeChange(code: String) {
    this.userManagerService.checkRegisterCode(code)
        .subscribe(data => {
          if (data.username != null) {
            this.user = data.username
            this.code = code
          } else {
            this.errMsg = "Koda ni pravilna ali je že v uporabi."
          }
        }
    )
  }

  register() {
    if (this.password.length < 5) {
      this.errMsgCheck = "Geslo mora biti dolgo vsaj 5 znakov."
    }
    else if (!this.validateEmail(this.email)) {
      this.errMsgCheck = "Email ni v pravilnem formatu."
    }
    else if (!this.check1 || !this.check2 || !this.check3) {
      this.errMsgCheck = "Za nadaljevanje registracije se morate strinjati z vsemi pogoji"
    }
    else {
      this.errMsgCheck = ""
    }

    if (this.errMsgCheck.length == 0) {
      this.userManagerService.registerUser(this.user, this.email, this.password, this.code)
        .subscribe(cookie => {
          if (cookie.jwt != null) {
            this.cookieManagerService.setCookie(cookie.jwt)
            this.router.navigate(['']);
          } else {
            this.errMsgCheck = "Koda za registracijo ni pravilna ali je že v uporabi."
          }
        })
    }
  }

  validateEmail(email: String)  {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

}
