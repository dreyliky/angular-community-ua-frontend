import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LinkValidateValidator, RequestApiService } from '@code-review/shared';
import { EMPTY, switchMap } from 'rxjs';

@Component({
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss'],
    selector: 'acua-request-from'
})
export class RequestFormComponent implements OnInit {
    @Output() public submitForm = new EventEmitter();
    protected form: FormGroup;
    protected iframeLink!: SafeUrl | null;

    public get valid(): boolean {
        return this.form.valid;
    }

    constructor(
        private requestApiService: RequestApiService,
        private domSanitizer: DomSanitizer
    ) {
        this.form = this.createForm();
    }

    public ngOnInit(): void {
        this.form = this.createForm();
        this.updateIframeLink();
    }

    public submit(): void {
        if (this.form.valid) {
            this.submitForm.next(this.form.value);
        }
    }

    protected createForm(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            description: new FormControl(),
            link: new FormControl(
                null,
                [Validators.required],
                [LinkValidateValidator.createValidator(this.requestApiService)]
            )
        });
    }

    protected hasControlError(controlName: string): boolean {
        return !!this.form.get(controlName)?.errors;
    }

    protected getLastControlError(controlName: string): string {
        const errors = this.form.get(controlName)?.errors as ValidationErrors;
        const errorKey = Object.keys(errors || {})[0];

        return errorKey;
    }

    private updateIframeLink(): void {
        const linkController = this.form.get('link');
        linkController?.statusChanges
            .pipe(
                switchMap((status) => {
                    if (status === 'VALID') {
                        return this.requestApiService.getNormalizedLink(
                            linkController.value
                        );
                    }
                    this.iframeLink = null;

                    return EMPTY;
                })
            )
            // unsubscribe service?
            .subscribe((link: string) => {
                this.iframeLink =
                    this.domSanitizer.bypassSecurityTrustResourceUrl(link);
            });
    }
}
