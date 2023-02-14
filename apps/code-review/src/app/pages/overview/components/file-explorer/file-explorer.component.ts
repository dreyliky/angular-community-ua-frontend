/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MonacoTreeElement } from './types/file-tree.type';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
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

	public handleClickFile(path: string): any {
	    this.clickFile.emit(path);
	}
}
