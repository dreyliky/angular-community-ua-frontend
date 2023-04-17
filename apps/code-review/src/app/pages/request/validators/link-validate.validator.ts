import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { ProjectSourceUrlService } from '@code-review/shared';
import { map, Observable } from 'rxjs';

@Injectable()
export class LinkValidateValidator implements AsyncValidator {
    constructor(private readonly projectSourceUrlService: ProjectSourceUrlService) {}

    public validate(control: AbstractControl<string, string>): Observable<ValidationErrors | null> {
        return this.projectSourceUrlService
            .validate(control.value)
            .pipe(map((result: boolean) => (result ? null : { linkValidate: true })));
    }
}
