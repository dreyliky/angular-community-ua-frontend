import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    ValidationErrors
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RequestService } from '../../../shared/services';

@Injectable({
    providedIn: 'root'
})
export class LinkValidateValidator implements AsyncValidator {
    constructor(private readonly requestService: RequestService) {}

    public validate(
        control: AbstractControl<any, any>
    ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
        return this.requestService
            .validateLink(control.value)
            .pipe(
                map((result: boolean) =>
                    result ? null : { linkValidate: true }
                )
            );
    }
}
