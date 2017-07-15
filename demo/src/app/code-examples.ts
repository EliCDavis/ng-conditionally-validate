export { exampleOne }

const exampleOne: string =
    `
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConditionallyValidateService } from "ng-conditionally-validate";

@Component({
    selector: 'app-example-one',
    templateUrl: './example-one.component.html',
    styleUrls: ['./example-one.component.css']
})
export class ExampleOneComponent implements OnInit {

    constructor(private cv: ConditionallyValidateService, private fb: FormBuilder) {
        
        this.form = fb.group({
            human: [false],
            food: ['', Validators.required],
            drink: ['', Validators.required]
        });

        cv.conditionallyValidate(this.form, 'food', 'drink')
            .when('human')
            .is(true);
    }

    ngOnInit() { }

}

`;