import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectSourceUrlService } from '@code-review/shared';
import { debounceTime, filter, Observable, switchMap } from 'rxjs';
import { RequestForm } from '../../forms';

@Component({
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss'],
    selector: 'acua-request-from',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormComponent implements OnInit {
    protected iframeLink$!: Observable<string>;

    constructor(
        protected readonly formGroup: RequestForm,
        private readonly projectSourceUrlService: ProjectSourceUrlService
    ) {}

    public ngOnInit(): void {
        this.iframeLink$ = this.getIframeLinkObservable();
    }

    private getIframeLinkObservable(): Observable<string> {
        return this.formGroup.controls.link.statusChanges.pipe(
            debounceTime(1000),
            filter((status) => status === 'VALID'),
            switchMap(() => {
                const value = this.formGroup.controls.link.value;

                return this.projectSourceUrlService.getNormalized(value);
            })
        );
    }
}
