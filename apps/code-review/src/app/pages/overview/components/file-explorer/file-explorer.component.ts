import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonacoTreeElement } from './types/file-tree.type';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
    @Input()
    public tree: MonacoTreeElement[] = [];
}
