import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
