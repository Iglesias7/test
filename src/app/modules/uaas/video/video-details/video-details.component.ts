import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {AfterViewInit, Component, Injectable} from "@angular/core";

@Component({
  selector: 'app-video-details',
  templateUrl: 'video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})

export class VideoDetailsComponent implements AfterViewInit {
  isMute = true;

  constructor(private _bottomSheetRef: MatBottomSheetRef<VideoDetailsComponent>) {}

  openLink(event: MouseEvent): void {
    event.preventDefault();
  }

  muted() {
    var myVideo: any = document.getElementById("video");
    console.log(this.isMute)
    if(this.isMute) {
      myVideo.muted = false;
      this.isMute = false;
    } else {
      myVideo.muted = true;
      this.isMute = true;
    }
  }

  claused() {
    this._bottomSheetRef.dismiss();
  }

  ngAfterViewInit(): void {
    var myVideo: any = document.getElementById("video");
    myVideo.muted = true;
  }
}
