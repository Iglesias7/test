import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ShoolsComponent} from "./shool/shools.component";
import {AuthGuardService} from "../core/services/auth-guard.service";
import {StudentsComponent} from "./students/students.component";
import {UaasComponent} from "./uaas/uaas.component";

const routes: Routes = [

  { path: '', component: HomeComponent , data: { title: 'PAGE_TITLES.HOME' }},
  { path: 'home', component: HomeComponent , data: { title: 'PAGE_TITLES.TABLEAU_DE_BORD' }},
  { path: 'shools', component: ShoolsComponent, canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.SHOOL' }},
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.STUDENT' }},
  { path: 'uaas', component: UaasComponent, canActivate: [AuthGuardService], data: { title: 'PAGE_TITLES.UAA' }},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
