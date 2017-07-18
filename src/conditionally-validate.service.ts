// MIT - Eli C Davis

import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

// https://github.com/rangle/angular-2-aot-sandbox#aot-dos-and-donts

@Injectable()
export class ConditionallyValidateService {

    constructor() { }

    private bootstrapControlsWithValidator(form: FormGroup, dependents: Array<string>, conditionLatest$: Observable<any>, validatorFactory: (control: AbstractControl) => ValidatorFn) {
        // Hook in validator
        dependents.forEach(dependency => {
            const dep = form.get(dependency);
            if (dep === null) {
                throw new ReferenceError(`[Conditionally Validate]: Passed in bad control selector (${dependency}) for a dependency`);
            }
            dep.setValidators(validatorFactory(dep));
        });

        // Update our dependents whenever we get a value change
        conditionLatest$.subscribe(x => {
            dependents.forEach(dependency => {
                const dep = form.get(dependency);
                if (dep === null) {
                    throw new ReferenceError(`[Conditionally Validate]: Control selector (${dependency}) returns missing control. What the hell did you do.`);
                }
                dep.updateValueAndValidity();
            });
        });

    }

    /**
     * Specify what you want to be validated conditionally. At the end of this chain 
     * you will be returned an observable that will emit a boolean value as to whether 
     * or not your condition is being satisfied.
     * @param form          The group you want to conditionally validate controls for.
     * @param dependents    The controls that need conditional validtation. Use the selection scheme 'groupName.controlName' for selecting within a group
     */
    validate(form: FormGroup, ...dependents: Array<string>): {
        when: (condition: string) => {
            is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => Observable<boolean>,
            isNot: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => Observable<boolean>
        }
    } {
        return {
            when: (condition: string) => {
                const conditionControl = form.get(condition);
                if (conditionControl === null) {
                    throw new ReferenceError(`[Conditionally Validate]: Passed in bad control selector (${condition}) for a condition`);
                }
                const conditionLatest$ = new BehaviorSubject<any>(conditionControl.value);

                conditionControl.valueChanges.subscribe(x => conditionLatest$.next(x));

                return {
                    is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean): Observable<boolean> => {
                        this.bootstrapControlsWithValidator(form, dependents, conditionLatest$,
                            (originalControl: AbstractControl) => {
                                const validators = originalControl.validator;
                                if (validators === null) {
                                    return (x) => null;
                                } else {
                                    return (control: AbstractControl): ValidationErrors | null => {
                                        const eq: boolean = equalityCheck ?
                                            equalityCheck(whenConditionalIsThis, conditionLatest$.getValue()) : whenConditionalIsThis === conditionLatest$.getValue();

                                        return eq ? validators(control) : null;
                                    };
                                }
                            }
                        );

                        return conditionLatest$.map(x => equalityCheck ?
                            equalityCheck(whenConditionalIsThis, x) : whenConditionalIsThis === x);
                    },
                    isNot: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => {
                        this.bootstrapControlsWithValidator(form, dependents, conditionLatest$,
                            (originalControl: AbstractControl) => {
                                const validators = originalControl.validator;
                                if (validators === null) {
                                    return (x) => null;
                                } else {
                                    return (control: AbstractControl): ValidationErrors | null => {
                                        const eq: boolean = equalityCheck ?
                                            equalityCheck(whenConditionalIsThis, conditionLatest$.getValue()) : whenConditionalIsThis === conditionLatest$.getValue();

                                        return eq ? null : validators(control);
                                    };
                                }
                            }
                        );

                        return conditionLatest$.map(x => equalityCheck ?
                            !equalityCheck(whenConditionalIsThis, x) : whenConditionalIsThis !== x);
                    }
                };
            }
        };
    }

}