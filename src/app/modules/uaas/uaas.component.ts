import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {ShoolService} from "../../core/services/shool.service";
import {Shool} from "../../core/models/shool";
import {UaaService} from "../../core/services/uaa.service";
import {Uaa} from "../../core/models/uaa";

@Component({
  selector: 'app-uaas',
  templateUrl: './uaas.component.html',
  styleUrls: ['./uaas.component.scss']
})

export class UaasComponent implements OnInit {
  uaas!: Uaa[];

  constructor(
    private uaaService: UaaService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.uaaService.findAll().subscribe(uaas => {
      this.uaas = uaas;
    })
  }
}
