[![Build Status](https://travis-ci.org/EliCDavis/ng-conditionally-validate.svg?branch=master)](https://travis-ci.org/EliCDavis/ng-conditionally-validate)
# Ng-Conditionally-Validate

An angular 2+ (works with angular 4 and 5) library that aims to improve the functionality of your forms without adding any of the complexity.

# Install

```
npm i ng-conditionally-validate --save
```

## Hook into your module

```typescript
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

```

## Inject Service into your Component

```typescript
import { Component } from '@angular/core';
import { ConditionallyValidateService } from 'ng-conditionally-validate';

@Component({ ... })
export class ExampleComponent {

  constructor(private cv: ConditionallyValidateService, ...) { ... }

}
```

# How To

## Reactive Forms

This library takes advantage of angular's [reactive forms](https://angular.io/guide/reactive-forms) module. If you are making forms of any kind inside your application and you are not using it, you should take the time to read up on what it is and how to get it setup in your project. It will speed up making any kind of form you can think of, and provides many different methods of form validation right in their with it while making it easy to implement your own validators. On top of all that, it transforms all form edits by the user into ReactiveX observables, giving you the power of any observable operator.

## Creating a Form

First we want to create a basic reactive form to hook into the template of our controller. I will not go into too much detail for this part of the process since there are plenty tutorials out there that tells you how it works in great detail. So in our component we might have something like this:

```typescript
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
```

Here we've used Angular's Form Builder to create us a reactive form with the two controls `referal` and `alternativeReferal`. At this point in time the form has a single validator function that is run against the value of `referal` whenever some change to the form is made. With this specific validator, `referal` must not be an empty string for it to be considered valid. Once all controls are considered valid then the form as a whole is considered valid.

This kind of form might seem familiar. Imagine we're trying to figure out how people found out about your online service. You might have a dropdown who's value is bound to the `referal` control of our form. But of course you can't think of every posibility of how a user found your website, so you've left an extra option 'other', and a extra field `alternativeReferal` for a user to fill in. You don't really need the user to fill in the alternative referal field unless the referal field is set to 'other'. Also, you really don't want the alternative referal text field to even render unless needed. This library makes that kind of functionality easy.

## Enter: Ng Conditionally Validate

All we need to do is import the Conditionally Validate Service and inject it into our component. We pass it our form and specify what controls we want to have some form of validation ran on them using the service's `validate()` function. This function is meant to be chained with multiple other calls to specify what exactly you want to happen with validation and how. At the end of the chaining you are returned an Rx observable that emits a boolean as to whether or not your validation functions you specified are being ran on the form controls you passed in. In the end we have our controller looking something like this:

```typescript
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
```

And the template code might look like this:

```html
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
```

The form is now only considered valid as a whole when referal is not empty, and if it is 'other' then alternative referal must not be empty.
