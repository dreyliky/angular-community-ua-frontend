import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { MonacoTreeFileNode, MonacoTreeNode } from '@code-review/shared';
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
    public tree!: MonacoTreeNode[];

    @Output()
    public fileSelected: EventEmitter<MonacoTreeFileNode> = new EventEmitter();

    public onFileSelected(node: MonacoTreeFileNode): void {
        this.fileSelected.emit(node);
    }
}
