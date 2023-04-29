import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDef, RequestFormInfo } from '@code-review/shared';
import { LinkValidateValidator } from '../validators';

@Injectable()
export class RequestForm extends FormGroup<FormGroupDef<RequestFormInfo>> {
    constructor(private readonly linkValidateValidator: LinkValidateValidator) {
        super({
            name: new FormControl('', { nonNullable: true }),
            description: new FormControl('', { nonNullable: true }),
            link: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required],
                asyncValidators: [linkValidateValidator.validate.bind(linkValidateValidator)]
            })
        });
    }
}
