import { Directive } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { ProjectFileSelectionState } from '../../../states';
import { EditorService } from '../services';

@Directive({
    selector: '[acuaFileOpener]',
    standalone: true
})
export class FileOpenerDirective {
    constructor(
        private readonly fileSelectionState: ProjectFileSelectionState,
        private readonly editorService: EditorService
    ) {
        this.initFileSelectionObserver();
    }

    @AutoUnsubscribe()
    private initFileSelectionObserver(): Subscription {
        return this.fileSelectionState.data$
            .pipe(filter(Boolean))
            .subscribe((file) => {
                this.editorService.openFile(file.fullPath, file.content);
            });
    }
}
