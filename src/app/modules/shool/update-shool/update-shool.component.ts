import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {Shool} from "../../../core/models/shool";
import {ShoolService} from "../../../core/services/shool.service";

@Component({
  selector: 'app-update-shool',
  templateUrl: './update-shool.component.html',
  styleUrls: ['./update-shool.component.scss']
})

export class UpdateShoolComponent implements OnDestroy {
  form: FormGroup | any;
  public isNew: boolean;

  private tempPicturePath: string;
  private tempPicturePathVideo: string | undefined;
  private pictureChanged: boolean;

  constructor(public dialogRef: MatDialogRef<UpdateShoolComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { shool: Shool; isNew: boolean; },
              private formBuilder: FormBuilder,
              private shoolService: ShoolService,
              private auth: AuthenticationService
  ) {
    this.createFormGroup();
    this.isNew = data.isNew;
    this.form.patchValue(data.shool);
    console.log(data)
    this.tempPicturePath = data.shool.logo;
    this.pictureChanged = false;
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      name: [
        null, Validators.required
      ]
    });
  }

  public update() {
    const data = this.form.value;
    data.picturePath = this.tempPicturePath;
    if (this.pictureChanged) {
      this.shoolService.confirmPicture(data.name, this.tempPicturePath).subscribe();
      data.picturePath = 'uploads/' + data.name + '.jpg';
      this.pictureChanged = false;
    }
    this.dialogRef.close(data);
  }

  public cancelTempPicture() {
    const data = this.form.value;
    if (this.pictureChanged) {
      this.shoolService.cancelPicture(data.name).subscribe();
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }

  public fileChange(event: Event) {
    // @ts-ignore
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.shoolService.uploadPicture(this.form.value.name || 'empty', file).subscribe(data => {
        this.cancelTempPicture();
        this.tempPicturePath = data.response;
        console.log(this.picturePath)
        this.pictureChanged = true;
        this.form.markAsDirty();
      });
    }
  }

  public fileChangeVideo(event: Event) {
    // @ts-ignore
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.shoolService.uploadVideo(this.form.value.name || 'empty', file).subscribe(data => {
        // this.cancelTempPicture();
        this.tempPicturePathVideo = data.response;
        // console.log(this.picturePath)
        // this.pictureChanged = true;
        this.form.markAsDirty();
      });
    }
  }

  get picturePath(): string {
    return this.tempPicturePath && this.tempPicturePath !== '' ? this.tempPicturePath : 'uploads/unknown-shool.png';
  }

  get picturePathVideo(): string {
    return this.tempPicturePathVideo && this.tempPicturePathVideo !== '' ? this.tempPicturePathVideo : 'uploads/unknown-shool.mp4';
  }

  ngOnDestroy(): void {
    this.cancelTempPicture();
  }
}
