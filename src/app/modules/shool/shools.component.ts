import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {ShoolService} from "../../core/services/shool.service";
import {Shool} from "../../core/models/shool";

@Component({
  selector: 'app-shools',
  templateUrl: './shools.component.html',
  styleUrls: ['./shools.component.scss']
})

export class ShoolsComponent implements OnInit {
  shools!: Shool[];

  constructor(
    private shoolService: ShoolService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.shoolService.findAll().subscribe(shools => {
      this.shools = shools;
    })
  }
}
