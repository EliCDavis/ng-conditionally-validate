import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  routeToTitle: any;

  fuck() { return "" }

  title$: Observable<string>;

  normalTitleBar$: Observable<boolean>;

  sidenavMode: Observable<string>;

  sidenavOpen$: Observable<boolean>;

  sidenavToggleClick$: Subject<any>;

  sidenavCloseRequest$: Subject<any>;

  showHamburgerMenu$: Observable<boolean>;

  sections: Array<{ title: string, subsections: Array<string> }>;

  constructor(private route: Router, iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {

    this.routeToTitle = {
      '/': 'Ng Conditionally Validate',
      '/install': 'Setup',
      '/inspiration': 'Insipration',
      '/how-to': 'How To',
      '/example/1': 'Basic Validation',
      '/example/2': 'Multiple Conditions',
      '/example/3': 'Conditional Validators'
    }

    this.sections = [
      {
        title: "Introduction",
        subsections: [
          "/inspiration",
          "/install",
          "/how-to"
        ]
      },
      {
        title: "Examples",
        subsections: [
          "/example/1",
          "/example/2",
          "/example/3"
        ]
      }
    ];

    this.title$ = route.events
      .filter(url => url instanceof NavigationEnd)
      .map((url: NavigationEnd) => {
        return this.routeToTitle[url.urlAfterRedirects];
      })

    this.normalTitleBar$ = route.events
      .filter(url => url instanceof NavigationEnd)
      .map((url: NavigationEnd) => {
        return url.urlAfterRedirects !== '/';
      })

    iconRegistry.addSvgIcon(
      'download',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ic_file_download_white_24px.svg'));

    iconRegistry.addSvgIcon(
      'code',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ic_code_white_24px.svg'));

    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github-circled-alt2.svg'));

    iconRegistry.addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl('assets/menu.svg'));

    this.sidenavToggleClick$ = new Subject<any>();
    this.sidenavCloseRequest$ = new Subject<any>();


  }

  ngOnInit() {

    this.sidenavMode = Observable.merge
      (
      Observable.fromEvent(window, 'resize')
        .map(() => {
          return document.documentElement.clientWidth;
        }),
      Observable.from([document.documentElement.clientWidth])
      )
      .map(x => x > 599 ? 'side' : 'over')
      .combineLatest(this.normalTitleBar$, (side, normal) => {
        return normal ? side : 'over';
      })
      .delay(100)
      .share();

    this.sidenavOpen$ = this.sidenavMode.combineLatest(
      this.sidenavToggleClick$
        .map(x => 'toggle')
        .merge(this.sidenavCloseRequest$.map(x => 'force'))
        .scan((acc, x) => x === 'force' ? false : !acc, false).startWith(false),
      (mode: string, toggle) => mode === 'side' ? true : toggle
    ).share();


    this.showHamburgerMenu$ = this.normalTitleBar$
      .combineLatest(this.sidenavMode, (normal, mode) => {
        return normal ? mode === 'over' : false;
      })

  }

}
