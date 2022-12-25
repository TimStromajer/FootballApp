import { Component, OnInit } from '@angular/core';
import { UserManagerService } from 'src/app/services/User/user-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  username: String = ""

  constructor(private userManagerService: UserManagerService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      console.log("navbar: " + event.constructor.name)
      if (event.constructor.name === "NavigationEnd" || event.constructor.name === "U1") {
        this.userManagerService.getUser()
          .subscribe(user => {
            console.log("navbar: " + user.username)
            this.username = user.username
          })
      }
    })
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
