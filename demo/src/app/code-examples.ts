export { importExample, injectExample, formThing, formThingComplete, formThingTemplate }

const importExample: string = `
import { ConditionallyValidateModule } from 'ng-conditionally-validate';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  ...
  imports: [
    ...
    NgModule,
    ReactiveFormsModule,
    ConditionallyValidateModule,
    ...
  ],
  ...
})
export class AppModule { }

`;

const injectExample: string = `
import { Component } from '@angular/core';
import { ConditionallyValidateService } from 'ng-conditionally-validate';

@Component({ ... })
export class ExampleComponent {

  constructor(private cv: ConditionallyValidateService, ...) { ... }

}

`;

const formThing: string = `
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component(...)
export class Example  {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

    this.form = fb.group({
      referal: ['', Validators.required],
      alternativeReferal: ''
    });

  }

}

`

const formThingComplete: string = `
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionallyValidateService } from 'ng-conditionally-validate';
import { Observable } from 'rxjs/Rx';

@Component(...)
export class Example  {

  form: FormGroup;
  displayAlternative$: Observable<boolean>;

  constructor(
    private cv: ConditionallyValidateService,
    private fb: FormBuilder
  ) {

    this.form = fb.group({
      referal: ['', Validators.required],
      alternativeReferal: ''
    });

    this.displayAlternative$ = cv
      .validate(this.form, 'alternativeReferal')
      .using(Validators.required)
      .when('referal')
      .is('other');
  }

}

`

const formThingTemplate = `
<h1>How'd you hear about us?</h1>
<div [formGroup]="form">
  <select formControlName="referal">
    <option value="ghub">Github</option>
    <option value="twitter">Twitter</option>
    <option value="other">Other</option>
  </select>
  <div *ngIf="displayAlternative$ | async">
    <p>Please enter how you heard about us</p>
    <input formControlName="alternativeReferal">
  </div>
</div>

`