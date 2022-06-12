import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import {AuthenticationService} from './core/services/authentication.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { locale } from './i18n/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(
    private router: Router,
    private translator: TranslateService,
    private titleService: Title,
    private auth: AuthenticationService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.translator.setTranslation('fr', locale);
    this.translator.setDefaultLang('fr');
    this.translator.use('fr');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(`${this.translator.instant('PAGE_TITLES.SITE_NAME')} |
          ${this.getRouteTitle(router.routerState, router.routerState.root).join('-')}`);
      }
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        // this.loaderService.display();
      }

      if (e instanceof NavigationEnd) {
        // this.loaderService.hide();
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  // collect that title data properties from all child routes
  private getRouteTitle(state:any, parent:any):any {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(this.translator.instant(parent.snapshot.data.title));
    }

    if (state && parent) {
      data.push(... this.getRouteTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  get currentUser() {
    return this.auth.currentUser;
  }
}

