import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() name: any;
  @Input() disabled: any;

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {

  }
}
