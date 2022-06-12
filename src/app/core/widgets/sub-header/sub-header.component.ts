import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterState} from '@angular/router';
import {filter} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubHeaderComponent implements OnInit {
  public currentTitle: any;
  public currentSubTitle: any;

  private readonly routesWithProductName = [
    '/add-shool',
    '/add-uaa',
    '/add-stu'
  ];

  private get needRoigleName(): boolean {
    return this
      .routesWithProductName
      .filter((route: string) => this.router.url.startsWith(route)).length > 0;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translator: TranslateService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // @ts-ignore
        this.updateRouteData(this.route.firstChild.snapshot.params);
      });
  }

  updateRouteData(params: { [key: string]: string }) {
    this.currentSubTitle = null;
    this.currentTitle = this.getMainTitle(this.router.routerState, this.router.routerState.root);

    if (this.needRoigleName) {
      this.currentSubTitle = this.getSubtitleFromRoigleName(this.router.routerState, this.router.routerState.root);
    }
  }

  private getMainTitle(state:any, parent:any): any {
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      return this.translator.instant(parent.snapshot.data.title);
    }

    if (state && parent) {
      return (this.getMainTitle(state, state.firstChild(parent)));
    }
  }

  private getSubtitleFromRoigleName(state:any, parent:any): any {
    if (parent && parent.snapshot.data && parent.snapshot.data.title && parent.snapshot.data.ParentTitle) {
      return this.translator.instant(parent.snapshot.data.ParentTitle);
    }

    if (state && parent) {
      return (this.getSubtitleFromRoigleName(state, state.firstChild(parent)));
    }
  }

  goBack() {
    this.router.navigate([`${this.router.routerState.snapshot.url}`]);
  }
}
