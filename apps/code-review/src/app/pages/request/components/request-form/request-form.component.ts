import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectSourceUrlService } from '@code-review/shared';
import { Observable, debounceTime, filter, map, switchMap } from 'rxjs';
import { RequestForm } from '../../forms';

@Component({
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.scss'],
    selector: 'acua-request-from',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormComponent {
    protected iframeLink$: Observable<string> = this.getIframeLinkObservable();

    constructor(
        protected readonly formGroup: RequestForm,
        private readonly projectSourceUrlService: ProjectSourceUrlService
    ) {}

    private getIframeLinkObservable(): Observable<string> {
        return this.formGroup.controls.sourceUrl.statusChanges.pipe(
            debounceTime(1000),
            filter((status) => status === 'VALID'),
            map(() => this.formGroup.controls.sourceUrl.value),
            switchMap((sourceUrl) =>
                this.projectSourceUrlService.getNormalized(sourceUrl)
            )
        );
    }
}
