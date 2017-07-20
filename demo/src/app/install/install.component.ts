import { Component, OnInit } from '@angular/core';
import { importExample, injectExample } from "../code-examples";

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {

  importEx: string = importExample;
  injectExample: string = injectExample;

  constructor() { }

  ngOnInit() {
  }

}
