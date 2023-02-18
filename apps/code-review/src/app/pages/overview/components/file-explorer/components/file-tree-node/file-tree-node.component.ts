import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges
} from '@angular/core';
import {
    EXTENSION_ICON_NAME_MAPPER,
    FILE_ICON_NAME_MAPPER,
    FOLDERS_ICON_NAME_MAPPER
} from '../../data';
import { MonacoTreeElement } from '../../types';

type ExtensionName = keyof typeof EXTENSION_ICON_NAME_MAPPER;
type FileName = keyof typeof FILE_ICON_NAME_MAPPER;
type FolderName = keyof typeof FOLDERS_ICON_NAME_MAPPER;

@Component({
    selector: 'acua-file-tree-node',
    templateUrl: './file-tree-node.component.html',
    styleUrls: ['./file-tree-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeNodeComponent implements OnChanges {
    @Input()
    public name = '';

    @Input()
    public content: MonacoTreeElement[] | null = null;

    @Input()
    public depth = 0;

    @Input()
    public hide = false;

    public get marginLeftStyleValue(): string {
        return `${this.baseMarginLeft * this.depth}px`;
    }

    public get isContentExist(): boolean {
        return this.content !== null && this.content !== undefined;
    }

    public get isHidden(): boolean {
        return !this.isOpened || this.hide;
    }

    public get incrementedDepth(): number {
        return this.depth + 1;
    }

    public get fileExplorerIconSrc(): string {
        return `/assets/icons/file-explorer/${this.icon}.svg`;
    }

    public get arrowCssClassesAsString(): string {
        const CLASSES = 'monaco-tree-arrow codicon codicon-chevron-down';

        if (this.isOpened) {
            return `${CLASSES} open`;
        }

        return CLASSES;
    }

    public get rowCssClassesAsString(): string {
        const CLASSES = 'monaco-tree-row';

        if (this.hide) {
            return `${CLASSES} hide`;
        }

        return CLASSES;
    }

    public isOpened = false;

    private readonly baseMarginLeft = 10;

    private icon!: string;

    public ngOnChanges(): void {
        this.icon = this.getIcon();
    }

    public onButtonToggle(): void {
        this.isOpened = !this.isOpened;
    }

    private getIcon(): string {
        if (this.isContentExist) {
            return this.getFolderIconName();
        }

        if (FILE_ICON_NAME_MAPPER[this.name as FileName]) {
            return this.getFileIconName();
        }

        const extensionIconName = this.tryGetExtensionIconName();

        if (extensionIconName) {
            return extensionIconName;
        }

        return 'file';
    }

    private getFolderIconName(): string {
        const nameAsFolderName = this.name as FolderName;
        let folderName = 'folder';

        if (FOLDERS_ICON_NAME_MAPPER[nameAsFolderName]) {
            folderName = FOLDERS_ICON_NAME_MAPPER[nameAsFolderName];
        }

        if (this.isOpened) {
            return `${folderName}-open`;
        }

        return folderName;
    }

    private getFileIconName(): string {
        return FILE_ICON_NAME_MAPPER[this.name as FileName];
    }

    private tryGetExtensionIconName(): string | null {
        let nameArray = this.name.split('.');

        while (nameArray.length > 0) {
            const possibleExtensionName = nameArray.join('.') as ExtensionName;

            if (EXTENSION_ICON_NAME_MAPPER[possibleExtensionName]) {
                return EXTENSION_ICON_NAME_MAPPER[possibleExtensionName];
            }
            nameArray = nameArray.slice(1);
        }

        return null;
    }
}
