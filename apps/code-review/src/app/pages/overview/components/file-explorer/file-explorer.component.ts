import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { ProjectEntity, ProjectFile } from '@code-review/shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { FileSelectionState } from './states';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FileSelectionState]
})
export class FileExplorerComponent {
    @Input({ required: true })
    public tree!: ProjectEntity[];

    @Output()
    public readonly fileSelected = new EventEmitter<ProjectFile>();

    constructor(
        private readonly fileSelectionState: FileSelectionState,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        this.initFileSelectionObserver();
    }

    @AutoUnsubscribe()
    private initFileSelectionObserver(): Subscription {
        return this.fileSelectionState.data$
            .pipe(filter(Boolean))
            .subscribe((file) => {
                this.fileSelected.emit(file);

                this.changeDetector.markForCheck();
            });
    }
}
