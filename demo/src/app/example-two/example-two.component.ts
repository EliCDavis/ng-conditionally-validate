import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionallyValidateService } from 'ng-conditionally-validate';
import { exampleOne } from "../code-examples";

@Component({
  selector: 'app-example-two',
  templateUrl: './example-two.component.html',
  styleUrls: ['./example-two.component.css']
})
export class ExampleTwoComponent implements OnInit {

  codeExample: string = exampleOne;

  form: FormGroup;

  pizzaTypes: Array<any> = [
    { value: 'cheese', viewValue: 'Cheese' },
    { value: 'peperoni', viewValue: 'Peperoni' },
    { value: 'pineapple', viewValue: 'Pineapple' }
  ]

  constructor(private cv: ConditionallyValidateService, private fb: FormBuilder) {

    this.form = fb.group({
      favoritePizza: ['', Validators.required],
      buyFromStarbucks: [false],
      reasonEvil: ['', Validators.required]
    });

    const evilValidate = cv.validate(this.form, 'reasonEvil');
    evilValidate.when('favoritePizza').is('pineapple');
    evilValidate.when('buyFromStarbucks').is(true);
  }

  ngOnInit() {
  }
}
