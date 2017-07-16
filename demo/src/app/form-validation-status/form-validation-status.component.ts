import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-validation-status',
  templateUrl: './form-validation-status.component.html',
  styleUrls: ['./form-validation-status.component.css']
})
export class FormValidationStatusComponent implements OnInit {

  @Input() form;

  constructor() { }

  ngOnInit() {
  }

}
