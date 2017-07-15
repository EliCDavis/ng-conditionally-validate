import { Component, OnInit } from '@angular/core';
import { importExample } from "../code-examples";

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {

  importEx: string = importExample;

  constructor() { }

  ngOnInit() {
  }

}
