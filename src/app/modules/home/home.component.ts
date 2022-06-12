import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../core/models/student";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  form: FormGroup | any;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      email: [
        null, Validators.required, [this.emailNotExist()]
      ],
      password: [
        null, Validators.required, [this.badPassword()]
      ]
    });
  }

  emailNotExist(): (ctl: FormControl) => Promise<any>  {
    let timeout: NodeJS.Timer;
    return (ctl: FormControl) => {
      clearTimeout(timeout);
      const email = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() => {
          if (ctl.pristine) {
            resolve(null);
          } else {
            this.authenticationService.findByEmail(email).subscribe(student => {
              resolve(student?.id != undefined ? null :  {emailNotExist: true } );
            });
          }
        }, 300);
      });
    };
  }

  badPassword(): (ctl: FormControl) => Promise<any> {
    let timeout: NodeJS.Timer;
    return (ctl: FormControl) => {
      clearTimeout(timeout);
      const email = this.form.get('email');
      const password = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() => {
          if (ctl.pristine) {
            resolve(null);
          } else {
            this.authenticationService.findByEmailAndPassword(email.value, password).subscribe(student => {
              console.log("component " + student?.id != undefined)
              resolve(student?.id != undefined ? null :  {badPassword: true } );
            });
          }
        }, 300);
      });
    };
  }

  connexion() {
    const data = this.form.value;

    if(!this.form.invalid)
      this.authenticationService.authenticate(data.email, data.password).subscribe(() => {
        if (this.authenticationService.currentUser) {
          this.router.navigate(['/shools']);
        }
      },
          (error: { error: { errors: any; }; }) => {
          const errors = error.error.errors;
          for (const field in errors) {
            console.log(field)
            this.form.get(field.toLowerCase()).setErrors({ custom: errors[field] });
          }
        });
  }
}
