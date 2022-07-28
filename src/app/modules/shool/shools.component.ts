import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {ShoolService} from "../../core/services/shool.service";
import {Shool} from "../../core/models/shool";
import {MatDialog} from "@angular/material/dialog";
import {UpdateShoolComponent} from "./update-shool/update-shool.component";

@Component({
  selector: 'app-shools',
  templateUrl: './shools.component.html',
  styleUrls: ['./shools.component.scss']
})

export class ShoolsComponent implements OnInit {
  shools!: Shool[];
  link: any;

  constructor(
    private shoolService: ShoolService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.shoolService.findAll().subscribe(shools => {
      this.shools = shools;
    });

    this.shoolService.findVideo("ckay").subscribe(link => {
      console.log(link);
    });
  }

  create() {
    const shool = new Shool({});
    const dlg = this.dialog.open(UpdateShoolComponent, { data: { shool, isNew: true } });
    dlg.beforeClosed().subscribe(res => {
      if (res) {
        this.shoolService.create(res).subscribe(res => {
          if (!res)
            console.log("here was an error at the server. The member has not been created! Please try again.")
        });
      }
    });
  }
}

