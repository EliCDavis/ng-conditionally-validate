import { Component, OnInit } from '@angular/core';
import { formThing, formThingComplete, formThingTemplate } from "../code-examples";

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css'],
  host: {
    class: 'mat-typography'
  }
})
export class HowToComponent implements OnInit {

  formThing: string = formThing;
  formThingComplete: string = formThingComplete;
  formThingTemplate: string = formThingTemplate;

  constructor() { }

  ngOnInit() {
  }

}
