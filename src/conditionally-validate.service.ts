// MIT - Eli C Davis

import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

// https://github.com/rangle/angular-2-aot-sandbox#aot-dos-and-donts

@Injectable()
export class ConditionallyValidateService {

    constructor() { }

    private conditionallyRequired(conditional$: BehaviorSubject<any>, whenConditionalIsThis: any, validators: any, equalityCheck?: (arg1: any, arg2: any) => boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            const eq: boolean = equalityCheck ?
                equalityCheck(whenConditionalIsThis, conditional$.getValue()) : whenConditionalIsThis === conditional$.getValue();

            return eq ? validators(control) : null;

        };
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
            is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => Observable<boolean>
        }
    } {
        return {
            when: (condition: string) => {
                const conditionControl = form.controls[condition];
                if (conditionControl === null) {
                    console.error(`[Conditionally Validate]: Passed in bad control selector (${condition}) for a condition`);
                    return {
                        is: (a, b?) => {
                            console.warn('[Conditionally Validate]: You passed in a bad selector!');
                            return Observable.of(false);
                        }
                    };
                }
                const conditionLatest$ = new BehaviorSubject<any>(conditionControl.value);

                conditionControl.valueChanges.subscribe(x => conditionLatest$.next(x));
                return {
                    is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean): Observable<boolean> => {

                        // Hook in validator
                        dependents.forEach(dependency => {
                            const dep = form.controls[dependency];
                            if (dep === null) {
                                console.warn(`[Conditionally Validate]: Passed in bad control selector (${dependency}) for a dependency`);
                                return Observable.of(null);
                            }

                            dep.setValidators(
                                this.conditionallyRequired(conditionLatest$, whenConditionalIsThis, dep.validator, equalityCheck)
                            );
                        });

                        // Update our dependents whenever we get a value change
                        conditionLatest$.subscribe(x => {
                            dependents.forEach(dependency => {
                                const dep = form.controls[dependency];
                                if (dep === null) {
                                    console.warn(`[Conditionally Validate]: Control selector (${dependency}) returns missing control`);
                                    return Observable.of(null);
                                }
                                dep.updateValueAndValidity();
                            });
                        });

                        return conditionLatest$.map(x => equalityCheck ?
                            equalityCheck(whenConditionalIsThis, x) : whenConditionalIsThis === x);

                    }
                };
            }
        };
    }

}