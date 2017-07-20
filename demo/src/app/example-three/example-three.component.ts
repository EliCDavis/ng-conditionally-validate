import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      typeOfAccount: ['normal'],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
    const passwordRule = cv.validate(this.form, 'password');

    passwordRule.using(Validators.minLength(12))
      .when('typeOfAccount')
      .is('admin');

    passwordRule.using(Validators.minLength(18))
      .when('typeOfAccount')
      .is('super');
  }

}
