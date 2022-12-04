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
    console.log("on init")
    this.router.events.subscribe(event => {
      console.log("router event " + event.constructor.name)
      if (event.constructor.name === "NavigationEnd") {
        console.log("router event NavigationEnd")
        this.userManagerService.getUser()
          .subscribe(user => {
            console.log("user " + user.username)
            this.username = user.username
          })
      }
    })

    this.userManagerService.getUser()
      .subscribe(user => {
        this.username = user.username
    })
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
