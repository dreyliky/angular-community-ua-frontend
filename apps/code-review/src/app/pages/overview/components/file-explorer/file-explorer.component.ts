import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { ProjectEntity, ProjectFile } from '@code-review/shared';
import { FileSelectionState } from './states';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FileSelectionState]
})
export class FileExplorerComponent {
    @Input()
    public tree!: ProjectEntity[];

    @Output()
    public fileSelected: EventEmitter<ProjectFile> = new EventEmitter();

    public onFileSelected(node: ProjectFile): void {
        this.fileSelected.emit(node);
    }
}
