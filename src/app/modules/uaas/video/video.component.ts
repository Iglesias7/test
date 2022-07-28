import {AfterViewInit, Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {UaaService} from "../../../core/services/uaa.service";
import {MatBottomSheet, MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {VideoDetailsComponent} from "./video-details/video-details.component";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements AfterViewInit {
  @Input() url: any;
  @Input() id: any;
  isMute = true;

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  step: any;

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  constructor(
    private uaaService: UaaService,
    private _bottomSheet: MatBottomSheet
  ) {
  }

  play() {
    var myVideo: any = document.getElementById(this.id);
    myVideo.play();
  }

  muted() {
    var myVideo: any = document.getElementById(this.id);
    console.log(this.isMute)
    if(this.isMute) {
      myVideo.muted = false;
      this.isMute = false;
    } else {
      myVideo.muted = true;
      this.isMute = true;
    }
  }

  pause() {
    var myVideo: any = document.getElementById(this.id);
    myVideo.pause();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(VideoDetailsComponent);
  }

  ngAfterViewInit(): void {
    var myVideo: any = document.getElementById(this.id);
    myVideo.muted = true;
  }
}
