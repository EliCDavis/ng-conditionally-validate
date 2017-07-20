import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConditionallyValidateService } from 'ng-conditionally-validate';

@Component({
  selector: 'app-example-three',
  templateUrl: './example-three.component.html',
  styleUrls: ['./example-three.component.css']
})
export class ExampleThreeComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cv: ConditionallyValidateService
  ) {
    this.form = fb.group({

    });
  }

}
