// MIT - Eli C Davis

import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConditionallyValidateService } from './conditionally-validate.service';

describe('ConditinoallyValidateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConditionallyValidateService, FormBuilder]
        });
    });

    it('should be created', inject([ConditionallyValidateService], (service: ConditionallyValidateService) => {
        expect(service).toBeTruthy();
    }));

    it('Form should be valid without any form control value changes', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['', Validators.required]
        });
        cv.validate(form, 'y').when('x').is('b');
        expect(form.valid).toBeTruthy();
    }));

    it('Form should not be valid without any form control value changes', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['', Validators.required]
        });
        cv.validate(form, 'y').when('x').is('a');
        expect(form.valid).toBeFalsy();
    }));

    it('Form should require validation after condition is met', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['', Validators.required]
        });
        cv.validate(form, 'y').when('x').is('b');
        expect(form.valid).toBeTruthy();
        form.get('x').setValue('b');
        expect(form.valid).toBeFalsy();
    }));


});