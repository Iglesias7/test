import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing.module';
import { WidgetModule } from 'src/app/core/widgets/widget.module';
import { ReactiveFormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {HomeComponent} from "./home/home.component";
import {ShoolComponent} from "./shool/shool/shool.component";
import {ShoolsComponent} from "./shool/shools.component";
import {NgChartsModule} from "ng2-charts";
import {NgApexchartsModule} from "ng-apexcharts";
import {PiComponent} from "./charts/pi.component";
import {CourbeComponent} from "./charts/courbe/courbe.component";
import {GestionComponent} from "./charts/gestion/gestion.component";
import {LigneComponent} from "./charts/ligne/ligne.component";
import {BubleComponent} from "./charts/buble/buble.component";
import {BarComponent} from "./charts/bar/bar.component";
import {StudentsComponent} from "./students/students.component";
import {StudentComponent} from "./students/student/student.component";
import {UaaComponent} from "./uaas/uaa/uaa.component";
import {UaasComponent} from "./uaas/uaas.component";
import {UpdateShoolComponent} from "./shool/update-shool/update-shool.component";
import {VideoComponent} from "./uaas/video/video.component";
import {VideoDetailsComponent} from "./uaas/video/video-details/video-details.component";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [
    HomeComponent,
    ShoolComponent,
    ShoolsComponent,
    PiComponent,
    CourbeComponent,
    GestionComponent,
    LigneComponent,
    BubleComponent,
    BarComponent,
    StudentsComponent,
    StudentComponent,
    UaaComponent,
    UaasComponent,
    VideoComponent,
    UpdateShoolComponent,
    VideoDetailsComponent
  ],
  imports: [
    HomeRoutingModule,
    WidgetModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgChartsModule,
    NgApexchartsModule
  ],
  exports: [

  ],
  entryComponents: [
    UpdateShoolComponent,
    VideoDetailsComponent
  ],
  providers: [
    // { provide: MatBottomSheet, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ]
})
export class HomeModule { }
