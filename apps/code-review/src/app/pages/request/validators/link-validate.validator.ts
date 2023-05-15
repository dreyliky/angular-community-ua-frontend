import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { ProjectSourceUrlService } from '@code-review/shared';
import {
    BehaviorSubject,
    Observable,
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
    take
} from 'rxjs';

@Injectable()
export class SourceUrlValidator {
    private readonly stackblitzErrorPatterns = [
        'public-status error',
        'public-section__error'
    ];

    constructor(
        private readonly projectSourceUrlService: ProjectSourceUrlService
    ) {}

    public get(): AsyncValidatorFn {
        const controlValue$ = new BehaviorSubject<string>('');
        const validationLogic$ = controlValue$.pipe(
            distinctUntilChanged(),
            debounceTime(1000),
            switchMap((url) => this.projectSourceUrlService.validate(url)),
            map((result: boolean) =>
                result ? null : { sourceUrlInvalid: true }
            )
        );

        return (
            control: AbstractControl<string, string>
        ): Observable<ValidationErrors | null> => {
            controlValue$.next(control.value);

            return validationLogic$.pipe(take(1));
        };
    }
}
