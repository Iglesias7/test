import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import {ShoolService} from "./shool.service";
import {StudentService} from "./student.service";
import {UaaService} from "./uaa.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    ErrorService,
    ShoolService,
    StudentService,
    UaaService
  ],
  declarations: []
})

export class ServiceModule { }
