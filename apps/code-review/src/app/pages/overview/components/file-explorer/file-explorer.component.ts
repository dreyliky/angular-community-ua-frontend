import {
    ChangeDetectionStrategy,
    Component, Input
} from '@angular/core';
import { FileExplorerThemeEnum } from './enums/file-explorer-theme.enum';
import { MonacoTreeElement } from './types/file-tree.type';

@Component({
    selector: 'acua-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
    @Input()
    public theme: FileExplorerThemeEnum = FileExplorerThemeEnum.Dark;

    @Input()
    public tree: MonacoTreeElement[] = [];

    @Input()
    public width = '300px';

    @Input()
    public height = '500px';
}
