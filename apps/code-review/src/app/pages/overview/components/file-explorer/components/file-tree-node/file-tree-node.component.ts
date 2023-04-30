import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output
} from '@angular/core';
import { ProjectEntity, ProjectFile } from '@code-review/shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription, filter } from 'rxjs';
import {
    EXTENSION_ICON_NAME_MAPPER,
    FILE_ICON_NAME_MAPPER,
    FOLDERS_ICON_NAME_MAPPER
} from '../../data';
import { FileSelectionState } from '../../states';

type ExtensionName = keyof typeof EXTENSION_ICON_NAME_MAPPER;
type FileName = keyof typeof FILE_ICON_NAME_MAPPER;
type FolderName = keyof typeof FOLDERS_ICON_NAME_MAPPER;

@Component({
    selector: 'acua-file-tree-node',
    templateUrl: './file-tree-node.component.html',
    styleUrls: ['./file-tree-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeNodeComponent implements OnChanges, OnInit {
    @Input()
    public node!: ProjectEntity;

    @Input()
    public depth = 0;

    @Output()
    public fileSelected = new EventEmitter<ProjectFile>();

    public get marginLeftStyleValue(): string {
        return `${this.baseMarginLeft * this.depth}px`;
    }

    public get doChildrenExist(): boolean {
        return !!this.node.children;
    }

    public get incrementedDepth(): number {
        return this.depth + 1;
    }

    public get fileExplorerIconSrc(): string {
        return `/assets/icons/file-explorer/${this.icon}.svg`;
    }

    public isOpened = false;
    public isSelected = false;

    private readonly baseMarginLeft = 10;

    private icon!: string;

    constructor(
        private readonly fileSelectionState: FileSelectionState,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        if (!this.node.children) {
            this.initFileSelection();
        }
    }

    public ngOnChanges(): void {
        if (!this.icon) {
            this.icon = this.getIcon();
        }
    }

    public onRowClick(): void {
        this.isOpened = !this.isOpened;

        if (!this.doChildrenExist) {
            this.fileSelectionState.set(this.node);
        }
    }

    @AutoUnsubscribe()
    private initFileSelection(): Subscription {
        return this.fileSelectionState.data$.pipe(filter(Boolean)).subscribe((node) => {
            this.isSelected = node.fullPath === this.node.fullPath;

            if (this.isSelected) {
                this.fileSelected.emit(this.node);
            }

            this.changeDetectorRef.markForCheck();
        });
    }

    private getIcon(): string {
        if (this.doChildrenExist) {
            return this.getFolderIconName();
        }

        if (FILE_ICON_NAME_MAPPER[this.node.name as FileName]) {
            return this.getFileIconName();
        }

        const extensionIconName = this.tryGetExtensionIconName();

        if (extensionIconName) {
            return extensionIconName;
        }

        return 'file';
    }

    private getFolderIconName(): string {
        const nameAsFolderName = this.node.name as FolderName;
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
        return FILE_ICON_NAME_MAPPER[this.node.name as FileName];
    }

    private tryGetExtensionIconName(): string | null {
        let nameArray = this.node.name.split('.');

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
