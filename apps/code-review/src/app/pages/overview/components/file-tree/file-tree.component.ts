/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ContextMenuAction } from '../../data/file-tree-node.type';
import { MonacoTreeElement } from '../../data/file-tree.type';

@Component({
    selector: 'acua-file-tree',
    templateUrl: './file-tree.component.html',
    styleUrls: ['./file-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent {
    @Input()
    public theme: 'vs-dark' | 'vs-light' = 'vs-dark';

    @Input()
    public tree: MonacoTreeElement[] = [];

	@Input()
    public width = '300px';

	@Input()
	public height = '500px';

	@Output()
	public clickFile = new EventEmitter<string>();

	@Output()
	public clickContextMenu = new EventEmitter<ContextMenuAction>();

	public handleClickFile(path: string): any {
	    this.clickFile.emit(path);
	}

	public handleClickContextMenu(event: ContextMenuAction): any {
	    this.clickContextMenu.emit(event);
	}
}
