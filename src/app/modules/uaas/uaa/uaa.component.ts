import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Shool} from "../../../core/models/shool";
import {Uaa} from "../../../core/models/uaa";

@Component({
  selector: 'app-uaa',
  templateUrl: './uaa.component.html',
  styleUrls: ['./uaa.component.scss']
})

export class UaaComponent implements OnInit {
  @Input() uaa!: Uaa;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

  }

}
