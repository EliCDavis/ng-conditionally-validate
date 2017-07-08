import { ConditionallyValidateService } from './conditionally-validate.service';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

export function cvFactory(): ConditionallyValidateService {
    return new ConditionallyValidateService();
}

@NgModule({
    providers: [
        FormsModule,
        ReactiveFormsModule,
        ConditionallyValidateService
    ],
})
export class ConditionallyValidationModule { }
