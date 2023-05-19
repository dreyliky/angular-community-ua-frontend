import { Directive } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import { FileSelectionService } from '../../../services';
import { EditorService } from '../services';

@Directive({
    selector: '[acuaFileOpener]',
    standalone: true
})
export class FileOpenerDirective {
    constructor(
        private readonly fileSelectionService: FileSelectionService,
        private readonly editorService: EditorService
    ) {
        this.initFileSelectionObserver();
    }

    @AutoUnsubscribe()
    private initFileSelectionObserver(): Subscription {
        return this.fileSelectionService.data$
            .pipe(filter(Boolean))
            .subscribe((file) => {
                this.editorService.openFile(file.fullPath, file.content);
            });
    }
}
