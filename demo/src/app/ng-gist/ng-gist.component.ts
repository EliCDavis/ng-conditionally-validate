// https://github.com/jasonhodges/ng2-gist/blob/master/src/ng2-gist.component.ts
import { Observable, Subject } from 'rxjs/Rx';
import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'ng-gist',
  template: `
    <iframe #iframe type="text/javascript" width="100%" frameborder="0"></iframe>
  `,
  styleUrls: []
})
export class NgGistComponent {
  @ViewChild('iframe') iframe: ElementRef;
  @Input() set gistId(id: string) {
    this.gist$.next(id);
  };

  gist$: Subject<string>;

  constructor() {
    this.gist$ = new Subject<string>();
    this.gist$
      .filter(x => x !== "")
      .subscribe(gist => {
        console.log('gist is: ', gist)
        this.iframe.nativeElement.id = 'gist-' + gist;
        let doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentElement.contentWindow;
        let content = `
        <html>
          <head>
            <base target="_parent">
          </head>
          <body onload="parent.document.getElementById('${this.iframe.nativeElement.id}')
          .style.height=document.body.scrollHeight + 'px'">
          <script type="text/javascript" src="https://gist.github.com/${gist}.js"></script>
          </body>
        </html>
      `;
        doc.open();
        doc.write(content);
        doc.close();
      });
  }
}