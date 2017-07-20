import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionallyValidateService } from 'ng-conditionally-validate';

@Component({
  selector: 'app-example-two',
  templateUrl: './example-two.component.html',
  styleUrls: ['./example-two.component.css']
})
export class ExampleTwoComponent {

  evilVisible$: Observable<boolean>;

  form: FormGroup;

  constructor(private cv: ConditionallyValidateService, private fb: FormBuilder) {
    this.form = fb.group({
      likesPinable: [false],
      buyFromStarbucks: [false],
      PAndM: [false],
      boneless: [false],
      reasonEvil: ['']
    });

    const evilValidate = cv.validate(this.form, 'reasonEvil').using(Validators.required);
    this.evilVisible$ = evilValidate.when('likesPinable').is(true)
      .combineLatest(
      evilValidate.when('buyFromStarbucks').is(true),
      evilValidate.when('PAndM').is(true),
      evilValidate.when('boneless').is(true),
      (pine, coffee, pm, boneless) => {
        return pine || coffee || pm || boneless;
      });
  }
}
