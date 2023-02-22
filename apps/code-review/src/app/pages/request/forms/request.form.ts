import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDef, LinkValidateValidator } from '@code-review/shared';
import { RequestFormInfo } from '../interfaces';

@Injectable()
export class RequestForm extends FormGroup<FormGroupDef<RequestFormInfo>> {
    constructor(private readonly linkValidateValidator: LinkValidateValidator) {
        super({
            name: new FormControl(),
            description: new FormControl(),
            link: new FormControl(
                '',
                [Validators.required],
                [linkValidateValidator.validate.bind(linkValidateValidator)]
            )
        });
    }
}
