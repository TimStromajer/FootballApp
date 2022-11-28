import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from 'src/app/services/Cookies/cookie-manager.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: String = ""
  password: String = "";
  email: String = "";

  errMsg: String = ""

  validationForm: FormGroup;

  constructor(private cookieManagerService: CookieManagerService) { 
    this.validationForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  registrationCodeChange(code: String) {
    if (code == "tim") {
      this.errMsg = ""
      this.user = "Jože"
      this.cookieManagerService.setCookie(this.user);
    } else {
      this.errMsg = "Koda ni pravilna."
    }
  }

  register() {
    console.log(this.user, this.password, this.email)
  }

}
