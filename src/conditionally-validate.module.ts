// MIT - Eli C Davis

import { ConditionallyValidateService } from './conditionally-validate.service';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    providers: [
        FormsModule,
        ReactiveFormsModule,
        ConditionallyValidateService
    ],
})
export class ConditionallyValidateModule { }
