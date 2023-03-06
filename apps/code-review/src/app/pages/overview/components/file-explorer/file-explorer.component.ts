import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonacoTreeFileNode, MonacoTreeNode } from './interfaces';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
    @Input()
    public tree!: MonacoTreeNode[];

    public onFileSelected(node: MonacoTreeFileNode): void {
        console.log(node);
    }
}
