import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

    validate(form: FormGroup, ...dependents: Array<string>): {
        when: (condition: string) => {
            is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => void
        }
    } {
        return {
            when: (condition: string) => {
                const conditionLatest$ = new BehaviorSubject<any>(null);
                const conditionControl = form.controls[condition];
                if (conditionControl === null) {
                    console.error(`[Conditionally Validate]: Passed in bad control selector (${condition}) for a condition`);
                    return {
                        is: (a, b?) => {
                            console.warn('[Conditionally Validate]: You passed in a bad selector!')
                        }
                    };
                }

                conditionControl.valueChanges.subscribe(x => conditionLatest$.next(x));
                return {
                    is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean): void => {

                        // Hook in validator
                        dependents.forEach(dependency => {
                            const dep = form.controls[dependency];
                            if (dep === null) {
                                console.warn(`[Conditionally Validate]: Passed in bad control selector (${dependency}) for a dependency`);
                                return;
                            }

                            dep.setValidators(
                                this.conditionallyRequired(conditionLatest$, whenConditionalIsThis, dep.validator, equalityCheck)
                            )
                        });

                        // Update our dependents whenever we get a value change
                        conditionLatest$.subscribe(x => {
                            dependents.forEach(dependency => {
                                const dep = form.controls[dependency];
                                if (dep === null) {
                                    console.warn(`[Conditionally Validate]: Control selector (${dependency}) returns missing control`);
                                    return;
                                }
                                dep.updateValueAndValidity();
                            });
                        });
                    }
                }
            }
        }
    }

}