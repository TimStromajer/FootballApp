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
      if (event.constructor.name === "NavigationEnd" || event.constructor.name === "UI") {
        console.log("router event NavigationEnd")
        this.userManagerService.getUser()
          .subscribe(user => {
            this.username = user.username
          })
      }
    })
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
