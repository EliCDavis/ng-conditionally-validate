export { importExample }

const importExample: string = `
import { ConditionallyValidationModule } from 'ng-conditionally-validate';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  ...
  imports: [
    ...
    NgModule,
    FormsModule,
    ReactiveFormsModule,
    ConditionallyValidationModule,
    ...
  ],
  ...
})
export class AppModule { }

`;