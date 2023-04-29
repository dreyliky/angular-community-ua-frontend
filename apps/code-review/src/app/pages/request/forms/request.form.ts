import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDef, ReviewRequestCreationDto } from '@code-review/shared';
import { SourceUrlValidator } from '../validators';

@Injectable()
export class RequestForm extends FormGroup<FormGroupDef<ReviewRequestCreationDto>> {
    constructor(linkValidateValidator: SourceUrlValidator) {
        super({
            description: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            sourceUrl: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required],
                asyncValidators: [linkValidateValidator.get()]
            })
        });
    }
}
