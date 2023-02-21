import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDef, LinkValidateValidator } from '@code-review/shared';
import { RequestService } from '@code-review/shared/services/request.service';
import { IRequestForm } from '../interfaces';

@Injectable()
export class RequestForm extends FormGroup<FormGroupDef<IRequestForm>> {
    constructor(private requestService: RequestService) {
        super({
            name: new FormControl(),
            description: new FormControl(),
            link: new FormControl(
                '',
                [Validators.required],
                [LinkValidateValidator.createValidator(requestService)]
            )
        });
    }
}
