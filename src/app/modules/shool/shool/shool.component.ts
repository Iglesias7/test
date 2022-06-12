import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Shool} from "../../../core/models/shool";

@Component({
  selector: 'app-shool',
  templateUrl: './shool.component.html',
  styleUrls: ['./shool.component.scss']
})

export class ShoolComponent implements OnInit {
  @Input() shool!: Shool;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

  }

}
