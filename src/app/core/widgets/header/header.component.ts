import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Location } from '@angular/common';
import {MatSidenav} from "@angular/material/sidenav";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() inputSideNav: MatSidenav | any;

  public showAppMenu = false;
  public showGoBack = true;

  get displayBackButton(): boolean {
    return this
      .routesWithBackButton
      .filter((route: string) => this.router.url.startsWith(route)).length > 0;
  }

  private readonly routesWithBackButton = [
    '/ad',
    '/dd',
    '/ddd'
  ];

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private dialog: MatDialog,
    private location: Location
  ) {
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  changeShowAppMenu(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    this.showAppMenu = !this.showAppMenu;
  }

  goBack(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    this.location.back();
  }
}
