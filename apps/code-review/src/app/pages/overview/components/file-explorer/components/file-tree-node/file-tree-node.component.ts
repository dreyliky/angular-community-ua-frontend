import {
    ChangeDetectionStrategy,
    Component, Input
} from '@angular/core';
import { extensions, files, folders } from '../../data';
import { FileExplorerThemeEnum } from '../../enums/file-explorer-theme.enum';
import { MonacoTreeElement } from '../../types';

@Component({
    selector: 'acua-file-tree-node',
    templateUrl: './file-tree-node.component.html',
    styleUrls: ['./file-tree-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeNodeComponent {
    @Input()
    public name = '';

    @Input()
    public content: MonacoTreeElement[] | null = null;

    @Input()
    public depth = 0;

    @Input()
    public theme: FileExplorerThemeEnum = FileExplorerThemeEnum.Dark;

    @Input()
    public hide = false;

    public isOpened = false;

    public get marginLeftStyleValue(): string {
        return `${10 * this.depth}px`;
    }

    public get isContent(): boolean {
        return this.content !== null && this.content !== undefined;
    }

    public get isHide(): boolean {
        return !this.isOpened || this.hide;
    }

    public get depthIncrement(): number {
        return this.depth + 1;
    }

    public get fileExplorerIconSrc(): string {
        return `./assets/icons/file-explorer/${this.icon}.svg`;
    }

    public get getClassesAndIfOpen(): string {
        const CLASSES = 'monaco-tree-arrow codicon codicon-chevron-down';

        if (this.isOpened) {
            return `${CLASSES} open`;
        }

        return CLASSES;
    }

    public get getClassesAndIfHide(): string {
        const CLASSES = 'monaco-tree-row';

        if (this.hide) {
            return `${CLASSES} hide ${this.theme}`;
        }

        return `${CLASSES} ${this.theme}`;
    }

    private get icon(): string {
        if (this.isContent) {
            return this.getDifferentFolders();
        }

        if (Object.keys(files).includes(this.name)) {
            return this.getFiles();
        }

        let nameArray = this.name.split('.');

        while (nameArray.length > 0) {
            if (Object.keys(extensions).includes(nameArray.join('.'))) {
                return this.getExtensions(nameArray.join('.'));
            }
            nameArray = nameArray.slice(1);
        }

        return 'file';
    }

    public onButtonToggle(): void {
        this.isOpened = !this.isOpened;
    }

    private getFolders(): string {
        const icon = folders[this.name as keyof typeof folders];

        if (this.isOpened) {
            return `${icon}-open`;
        }

        return icon;
    }

    private getDifferentFolders(): string {
        if (Object.keys(folders).includes(this.name)) {
            return this.getFolders();
        }

        if (this.isOpened) {
            return 'folder-open';
        }

        return 'folder';
    }

    private getFiles(): string {
        return files[this.name as keyof typeof files];
    }

    private getExtensions(splittedName: string): string {
        return extensions[splittedName as keyof typeof extensions];
    }
}
