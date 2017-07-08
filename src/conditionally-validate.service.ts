import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConditionallyValidateService {

    constructor() { }

    conditionallyRequired(conditional$: BehaviorSubject<any>, whenConditionalIsThis: any, validators: any, equalityCheck?: (arg1: any, arg2: any) => boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            const eq: boolean = equalityCheck ?
                equalityCheck(whenConditionalIsThis, conditional$.getValue()) : whenConditionalIsThis === conditional$.getValue();

            if (eq) {
                const reqErrors = Validators.required(control) || (validators !== null ? validators(control) : null);
                return reqErrors ? { 'conditional': { 'requiredBecause': conditional$.getValue() } } : null;
            }

            return null;
        };
    }

    conditionallyValidate(form: FormGroup, ...dependents: Array<string>): any {
        return {
            areRequiredWhen: (condition: string) => {
                const conditionLatest$ = new BehaviorSubject<any>(null);
                const conditionControl = form.get(condition);
                if (conditionControl === null) {
                    console.error(`[Conditionally Validate]: Passed in bad control selector (${condition}) for a condition`);
                    return;
                }

                conditionControl.valueChanges.subscribe(x => conditionLatest$.next(x));
                return {
                    is: (whenConditionalIsThis: any, equalityCheck?: (arg1: any, arg2: any) => boolean) => {

                        // Hook in validator
                        dependents.forEach(dependency => {
                            const dep = form.get(dependency);
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
                                const dep = form.get(dependency);
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