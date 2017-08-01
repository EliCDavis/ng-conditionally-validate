// MIT - Eli C Davis

import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { ConditionallyValidateService } from './conditionally-validate.service';
import { Observable } from 'rxjs/Rx';

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
            y: ['']
        });
        cv.validate(form, 'y').using(Validators.required).when('x').is('b');
        expect(form.valid).toBeTruthy();
    }));

    it('Form should not be valid without any form control value changes', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['']
        });
        cv.validate(form, 'y').using(Validators.required).when('x').is('a');
        expect(form.valid).toBeFalsy();
    }));

    it('Form should require validation after condition is met', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['']
        });
        cv.validate(form, 'y').using(Validators.required).when('x').is('b');
        expect(form.valid).toBeTruthy();
        form.get('x').setValue('b');
        expect(form.valid).toBeFalsy();
    }));

    it('Service should return observable that emits a boolean whether or not validation is taking place', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['']
        });
        const obs = cv.validate(form, 'y').using(Validators.required).when('x').is('b');
        expect(obs).toBeTruthy();

        let lastVal = null;
        obs.subscribe(x => { lastVal = x; });
        expect(lastVal).toBeFalsy();
        form.get('x').setValue('b');
        expect(lastVal).toBeTruthy();
        form.get('x').setValue('a');
        expect(lastVal).toBeFalsy();
    }));

    it('Should be valid when x "inNot" b', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['']
        });
        cv.validate(form, 'y').using(Validators.required).when('x').isNot('b');
        expect(form.valid).toBeFalsy();
        form.get('x').setValue('b');
        expect(form.valid).toBeTruthy();
    }));

    it('Should not be valid when x "inNot" b and starts out as b', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['b'],
            y: ['']
        });
        cv.validate(form, 'y').using(Validators.required).when('x').isNot('b');
        expect(form.valid).toBeTruthy();
        form.get('x').setValue('a');
        expect(form.valid).toBeFalsy();
    }));

    it('Service using "isNot" should return observable that emits a boolean whether or not validation is taking place', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: ['a'],
            y: ['']
        });

        let lastVal = null;

        cv.validate(form, 'y')
            .using(Validators.required)
            .when('x')
            .isNot('b')
            .subscribe(x => { lastVal = x; });

        form.get('x').setValue('b');
        expect(lastVal).toBeFalsy();
        form.get('x').setValue('a');
        expect(lastVal).toBeTruthy();
    }));

    it('Form can validate nested controls', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            x: fb.group({
                a: 1
            }),
            y: fb.group({
                b: ['']
            })
        });
        cv.validate(form, 'y.b').using(Validators.required).when('x.a').is(1);
        expect(form.valid).toBeFalsy();
    }));

    it('Form control can be required by 2 or more other controls', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form: FormGroup = fb.group({
            w: '',
            x: '',
            y: ''
        });
        const yReq = cv.validate(form, 'y').using(Validators.required);
        yReq.when('w').is(2);
        yReq.when('x').is(1);
        expect(form.valid).toBeTruthy();

        form.get('x').setValue(1);
        expect(form.valid).toBeFalsy();

        form.get('x').setValue(2);
        expect(form.valid).toBeTruthy();

        form.get('w').setValue(2);
        expect(form.valid).toBeFalsy();

        form.get('w').setValue(1);
        expect(form.valid).toBeTruthy();

        form.get('x').setValue(1);
        form.get('w').setValue(2);
        expect(form.valid).toBeFalsy();
    }));

    it('throws error when no validators are passed in', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        expect(() => cv.validate(fb.group({ x: '' }), 'y').using()).toThrowError('[Conditionally Validate]: You didn\'t pass in any validator functions!');
    }));

    it('throws error when bad selector is passed in', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        expect(() => cv.validate(fb.group({ x: '' }), 'x').using(Validators.required).when('y')).toThrowError('[Conditionally Validate]: Passed in bad control selector \'y\' for a condition');
    }));

    it('throws error when bad selector to validate is passed in', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        expect(() => cv.validate(fb.group({ x: '' }), 'y').using(Validators.required).when('x').is(true)).toThrowError('[Conditionally Validate]: Passed in bad control selector \'y\' for a dependency');
    }));

    it('throws error when selector has become bad once removed from a form', inject([ConditionallyValidateService, FormBuilder], (cv: ConditionallyValidateService, fb: FormBuilder) => {
        const form = fb.group({ x: '', y: '' });
        cv.validate(form, 'x').using(Validators.required).when('y').is('something');
        form.removeControl('x');
        expect(() => form.get('y').setValue('else')).toThrowError('[Conditionally Validate]: Control selector \'x\' returns missing control. Did you remove the control from the form?');
    }));

});