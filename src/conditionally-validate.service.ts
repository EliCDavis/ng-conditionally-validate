// MIT - Eli C Davis

import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConditionallyValidateService {

    constructor() { }

    private bootstrapControlsWithValidator(form: FormGroup, dependents: Array<string>, conditionLatest$: Observable<any>, validatorFactory: (control: AbstractControl) => ValidatorFn) {
        // Hook in validator
        dependents.forEach(dependency => {
            const dep = form.get(dependency);
            if (dep === null) {
                throw new ReferenceError(`[Conditionally Validate]: Passed in bad control selector '${dependency}' for a dependency`);
            }
            dep.setValidators(Validators.compose([dep.validator, validatorFactory(dep)]));
        });

        // Update our dependents whenever we get a value change
        conditionLatest$.subscribe(x => {
            dependents.forEach(dependency => {
                const dep = form.get(dependency);
                if (dep === null) {
                    throw new ReferenceError(`[Conditionally Validate]: Control selector '${dependency}' returns missing control. Did you remove the control from the form?`);
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
        using: (...validators: Array<ValidatorFn>) => {
            when: (condition: string) => {
                is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => Observable<boolean>,
                isNot: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => Observable<boolean>
            }
        }
    } {
        return {
            using: (...validators: Array<ValidatorFn>) => {
                const allValidators = Validators.compose(validators);
                if (allValidators === null) {
                    throw new ReferenceError(`[Conditionally Validate]: You didn't pass in any validator functions!`);
                }
                return {
                    when: (condition: string) => {
                        const conditionControl = form.get(condition);
                        if (conditionControl === null) {
                            throw new ReferenceError(`[Conditionally Validate]: Passed in bad control selector '${condition}' for a condition`);
                        }
                        const conditionLatest$ = new BehaviorSubject<any>(conditionControl.value);

                        conditionControl.valueChanges.subscribe(x => conditionLatest$.next(x));

                        return {
                            is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean): Observable<boolean> => {
                                this.bootstrapControlsWithValidator(form, dependents, conditionLatest$,
                                    (originalControl: AbstractControl) => {
                                        return (control: AbstractControl): ValidationErrors | null => {
                                            const eq: boolean = equalityCheck ?
                                                equalityCheck(whenConditionalIsThis, conditionLatest$.getValue()) : whenConditionalIsThis === conditionLatest$.getValue();
                                            return eq ? allValidators(control) : null;
                                        };
                                    }
                                );

                                return conditionLatest$.map(x => equalityCheck ?
                                    equalityCheck(whenConditionalIsThis, x) : whenConditionalIsThis === x);
                            },
                            isNot: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => {
                                this.bootstrapControlsWithValidator(form, dependents, conditionLatest$,
                                    (originalControl: AbstractControl) => {
                                        return (control: AbstractControl): ValidationErrors | null => {
                                            const eq: boolean = equalityCheck ?
                                                equalityCheck(whenConditionalIsThis, conditionLatest$.getValue()) : whenConditionalIsThis === conditionLatest$.getValue();

                                            return eq ? null : allValidators(control);
                                        };
                                    }
                                );

                                return conditionLatest$.map(x => equalityCheck ?
                                    !equalityCheck(whenConditionalIsThis, x) : whenConditionalIsThis !== x);
                            }
                        };
                    }
                };
            }
        };
    }

}