import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionallyValidateService } from 'ng-conditionally-validate';
import { exampleOne } from "../code-examples";

@Component({
  selector: 'app-example-one',
  templateUrl: './example-one.component.html',
  styleUrls: ['./example-one.component.css']
})
export class ExampleOneComponent implements OnInit {

  codeExample: string = exampleOne;

  form: FormGroup;

  constructor(private cv: ConditionallyValidateService, private fb: FormBuilder) {

    this.form = fb.group({
      human: [false],
      food: ['', Validators.required],
      drink: ['', Validators.required]
    });

    cv.validate(this.form, 'food', 'drink')
      .when('human')
      .is(true)
  }

  ngOnInit() {
  }

}
