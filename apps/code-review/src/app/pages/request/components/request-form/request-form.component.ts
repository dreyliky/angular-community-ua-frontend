import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RequestService } from '@code-review/shared';
import { EMPTY, switchMap } from 'rxjs';
import { RequestForm } from '../../forms';
import { IRequestForm } from '../../interfaces';

@Component({
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss'],
    selector: 'acua-request-from',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RequestForm]
})
export class RequestFormComponent implements OnInit {
    protected iframeLink!: SafeUrl | null;
    protected nameControl!: FormControl;
    protected descriptionControl!: FormControl;
    protected linkControl!: FormControl;

    public get value(): Partial<IRequestForm> {
        return this.form.value;
    }

    public get valid(): boolean {
        return this.form.valid;
    }

    constructor(
        protected form: RequestForm,
        private requestService: RequestService,
        private domSanitizer: DomSanitizer
    ) {}

    public ngOnInit(): void {
        this.initControls();
        this.updateIframeLink();
    }

    protected initControls(): void {
        this.nameControl = this.form.get('name') as FormControl;
        this.descriptionControl = this.form.get('description') as FormControl;
        this.linkControl = this.form.get('link') as FormControl;
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
                        const value = linkController.value as string;

                        return this.requestService.getNormalizedLink(value);
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
