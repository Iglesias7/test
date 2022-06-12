import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { WidgetModule } from './core/widgets/widget.module';
import { JwtInterceptor } from './core/interceptors/auth.interceptor';
import {AppRoutingModule} from "./app.routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HomeModule} from "./modules/home.module";
import {MenuComponent} from "./core/widgets/menu/menu.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    WidgetModule,
    MatSidenavModule,
    WidgetModule,
    TranslateModule
  ],
  entryComponents: [ ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
