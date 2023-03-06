import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
    EXTENSION_ICON_NAME_MAPPER,
    FILE_ICON_NAME_MAPPER,
    FOLDERS_ICON_NAME_MAPPER
} from '../../data';
import { MonacoTreeFileNode, MonacoTreeNode } from '../../interfaces';
import { FileSelectionService } from '../../services';
import { FileExplorerDepthState } from '../../states';

type ExtensionName = keyof typeof EXTENSION_ICON_NAME_MAPPER;
type FileName = keyof typeof FILE_ICON_NAME_MAPPER;
type FolderName = keyof typeof FOLDERS_ICON_NAME_MAPPER;

@Component({
    selector: 'acua-file-tree-node',
    templateUrl: './file-tree-node.component.html',
    styleUrls: ['./file-tree-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeNodeComponent implements OnChanges, OnDestroy, OnInit {
    @Input()
    public node!: MonacoTreeNode;

    @Input()
    public children: MonacoTreeNode[] | null = null;

    @Input()
    public depth = 0;

    @Input()
    public hide = false;

    @Output()
    public fileSelected: EventEmitter<MonacoTreeFileNode> = new EventEmitter();

    public get name(): string {
        return this.node.name;
    }

    public get marginLeftStyleValue(): string {
        return `${this.baseMarginLeft * this.depth}px`;
    }

    public get doChildrenExist(): boolean {
        return !!this.children;
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

    public get fileExplorerDepth(): number {
        return this.fileExplorerDepthState.data as number;
    }

    public isOpened = false;
    public isSelected = false;
    public isHovered = false;

    private timer!: NodeJS.Timeout | null;

    private readonly baseMarginLeft = 10;

    private icon!: string;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private readonly fileSelectionService: FileSelectionService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly fileExplorerDepthState: FileExplorerDepthState
    ) {}

    public ngOnInit(): void {
        this.initFileSelection();
    }

    public ngOnChanges(): void {
        if (!this.icon && this.depth <= this.fileExplorerDepth) {
            this.icon = this.getIcon();
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onButtonToggle(): void {
        this.isOpened = !this.isOpened;
        this.fileExplorerDepthState.set(this.incrementedDepth);

        if (this.doChildrenExist) {
            return;
        }

        const node = this.node as MonacoTreeFileNode;

        this.fileSelectionService.setData(node);
    }

    public onFileSelected(node: MonacoTreeFileNode): void {
        this.fileSelected.emit(node);
    }

    public onNameOver(): void {
        this.timer = setTimeout(() => {
            this.isHovered = true;
            this.changeDetectorRef.markForCheck();
        }, 1500);
    }

    public onNameLeave(): void {
        if (!this.timer) {
            return;
        }
        this.isHovered = false;
        clearTimeout(this.timer);
        this.changeDetectorRef.markForCheck();
    }

    private initFileSelection(): void {
        this.fileSelectionService.data$
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (node: MonacoTreeFileNode | null) => {
                    if (!node) {
                        return;
                    }

                    this.isSelected = node === this.node ? true : false;

                    if (this.isSelected) {
                        const _node = this.node as MonacoTreeFileNode;
                        this.fileSelected.emit(_node);
                    }

                    this.changeDetectorRef.markForCheck();
                }
            });
    }

    private getIcon(): string {
        if (this.doChildrenExist) {
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
