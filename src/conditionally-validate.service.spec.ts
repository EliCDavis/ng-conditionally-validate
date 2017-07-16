// MIT - Eli C Davis

import { TestBed, inject } from '@angular/core/testing';

import { ConditionallyValidateService } from './conditionally-validate.service';

describe('ConditinoallyValidateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConditionallyValidateService]
        });
    });

    it('should be created', inject([ConditionallyValidateService], (service: ConditionallyValidateService) => {
        expect(service).toBeTruthy();
    }));

    it('should fails', inject([ConditionallyValidateService], (service: ConditionallyValidateService) => {
        expect(null).toBeTruthy();
    }));

});