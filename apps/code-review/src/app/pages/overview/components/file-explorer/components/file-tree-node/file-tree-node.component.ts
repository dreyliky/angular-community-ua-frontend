import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    inject
} from '@angular/core';
import { ProjectEntity, ProjectFile } from '@code-review/shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { DeviceDetectorService } from 'ngx-device-detector';
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

    @Input()
    public hide = false;

    @Output()
    public fileSelected: EventEmitter<ProjectFile> = new EventEmitter();

    public get marginLeftStyleValue(): string {
        return `${this.baseMarginLeft * this.depth}px`;
    }

    public get doChildrenExist(): boolean {
        return !!this.node.children;
    }

    public get isFile(): boolean {
        return !!this.node.content;
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
        const CLASSES = `monaco-tree-row ${this.rowAdaptationCssClass}`;

        if (this.hide) {
            return `${CLASSES} hide`;
        }

        return CLASSES;
    }

    public get isAllowedToRender(): boolean {
        return !this.isHidden || this.hasBeenOpened;
    }

    public isOpened = false;
    public isSelected = false;

    public readonly isMobile = inject(DeviceDetectorService).isMobile();

    public readonly fileIconCssClass = this.isMobile
        ? 'monaco-tree-icon-mobile'
        : 'monaco-tree-icon';

    private readonly rowAdaptationCssClass = this.isMobile
        ? 'monaco-tree-row-mobile'
        : 'monaco-tree-row-desktop';

    private hasBeenOpened = false;

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

    public onButtonToggle(): void {
        this.isOpened = !this.isOpened;
        this.hasBeenOpened = true;

        if (this.doChildrenExist) {
            return;
        }

        this.fileSelectionState.set(this.node as ProjectFile);
    }

    public onFileSelected(node: ProjectFile): void {
        this.fileSelected.emit(node);
    }

    @AutoUnsubscribe()
    private initFileSelection(): Subscription {
        return this.fileSelectionState.data$
            .pipe(filter<ProjectFile | null>(Boolean))
            .subscribe((node: ProjectFile) => {
                this.isSelected = node.fullPath === this.node.fullPath;

                if (this.isSelected) {
                    this.fileSelected.emit(this.node as ProjectFile);
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
