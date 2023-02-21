import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { RequestService } from '../services';

export class LinkValidateValidator {
    public static createValidator(
        requestService: RequestService
    ): AsyncValidatorFn {
        return (
            control: AbstractControl
        ): Observable<ValidationErrors | null> => {
            return requestService
                .validateLink(control.value)
                .pipe(
                    map((result: boolean) =>
                        result ? null : { linkValidate: true }
                    )
                );
        };
    }
}
