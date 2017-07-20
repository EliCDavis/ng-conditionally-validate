export { importExample, injectExample }

const importExample: string = `
import { ConditionallyValidationModule } from 'ng-conditionally-validate';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  ...
  imports: [
    ...
    NgModule,
    ReactiveFormsModule,
    ConditionallyValidationModule,
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