import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RequestService } from '@code-review/shared';
import { filter, Observable, switchMap } from 'rxjs';
import { RequestForm } from '../../forms';
import { RequestFormInfo } from '../../interfaces';

@Component({
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss'],
    selector: 'acua-request-from',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormComponent implements OnInit {
    protected nameControl!: FormControl;
    protected descriptionControl!: FormControl;
    protected linkControl!: FormControl;
    protected iframeLink$!: Observable<string>;

    public get value(): Partial<RequestFormInfo> {
        return this.form.value;
    }

    public get valid(): boolean {
        return this.form.valid;
    }

    constructor(
        protected form: RequestForm,
        private requestService: RequestService
    ) {}

    public ngOnInit(): void {
        this.initControls();
    }

    protected initControls(): void {
        this.nameControl = this.form.get('name') as FormControl;
        this.descriptionControl = this.form.get('description') as FormControl;
        this.linkControl = this.form.get('link') as FormControl;
    }

    protected onLinkChange(): void {
        this.iframeLink$ = this.getIframeLink();
    }

    private getIframeLink(): Observable<string> {
        return this.linkControl.statusChanges.pipe(
            filter((status) => status === 'VALID'),
            switchMap(() => {
                const value = this.linkControl.value as string;

                return this.requestService.getNormalizedLink(value);
            })
        );
    }
}
