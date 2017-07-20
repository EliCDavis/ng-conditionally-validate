import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionallyValidateService } from 'ng-conditionally-validate';

@Component({
  selector: 'app-example-one',
  templateUrl: './example-one.component.html',
  styleUrls: ['./example-one.component.css']
})
export class ExampleOneComponent implements OnInit {

  form: FormGroup;

  constructor(private cv: ConditionallyValidateService, private fb: FormBuilder) {

    this.form = fb.group({
      human: [false],
      food: [''],
      drink: ['']
    });

    cv.validate(this.form, 'food', 'drink')
      .using(Validators.required)
      .when('human')
      .is(true)
  }

  ngOnInit() {
  }

}
