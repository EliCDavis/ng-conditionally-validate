import { Component, OnInit } from '@angular/core';
import { ConditionallyValidateService } from "ng-conditionally-validate";

@Component({
  selector: 'app-example-one',
  templateUrl: './example-one.component.html',
  styleUrls: ['./example-one.component.css']
})
export class ExampleOneComponent implements OnInit {

  constructor(private cv: ConditionallyValidateService) { }

  ngOnInit() {
  }

}
