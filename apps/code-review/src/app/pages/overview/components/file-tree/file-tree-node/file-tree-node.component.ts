import {
    ChangeDetectionStrategy,
    Component,
    ElementRef, EventEmitter, HostListener,
    Input,
    Output
} from '@angular/core';
import {
    ContextMenuAction,
    ContextMenuElementSeparator,
    ContextMenuElementText,
    extensions,
    files,
    folders,
    MonacoTreeElement
} from '@code-review/pages/overview/data';

function getAbsolutePosition(element: any): any {
    const r = { x: element.offsetLeft, y: element.offsetTop };

    if (element.offsetParent) {
        const tmp = getAbsolutePosition(element.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }

    return r;
}

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
    public content: MonacoTreeElement[] | undefined | null = undefined;

    @Input()
	public depth = 0;

    @Input()
    public theme: 'vs-dark' | 'vs-light' = 'vs-dark';

    @Input()
    public hide = false;

	@Output()
    public clickFile = new EventEmitter<string>();

    @Output()
	public contextMenuClick = new EventEmitter<ContextMenuAction>();

    public open = false;

    public position: [number, number] | undefined = undefined;

    constructor(private eRef: ElementRef) {}

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public contextMenu: Array<ContextMenuElementSeparator | ContextMenuElementText> = [
        {
            type: 'element',
            name: 'New File',
            action: () => {
                this.contextMenuClick.emit(['new_file', this.name]);
                this.position = [-1000, -1000];
            }
        },
        {
            type: 'element',
            name: 'New Directory',
            action: () => {
                this.contextMenuClick.emit(['new_directory', this.name]);
                this.position = [-1000, -1000];
            }
        },
        {
            type: 'separator'
        },
        {
            type: 'element',
            name: 'Rename',
            action: () => {
                this.contextMenuClick.emit(['rename_file', this.name]);
                this.position = [-1000, -1000];
            }
        },
        {
            type: 'element',
            name: 'Delete',
            action: () => {
                this.contextMenuClick.emit(['delete_file', this.name]);
                this.position = [-1000, -1000];
            }
        }
    ];

    // eslint-disable-next-line max-lines-per-function
    public get icon(): any {
        if (this.folder) {
            if (Object.keys(folders).includes(this.name)) {
                const icon = folders[this.name as keyof typeof folders];

                if (this.open) {
                    return icon + '-open';
                }

                return icon;
            }

            if (this.open) {
                return 'folder-open';
            }

            return 'folder';
        }

        if (Object.keys(files).includes(this.name)) {
            return files[this.name as keyof typeof files];
        }

        let splited = this.name.split('.');

        while (splited.length > 0) {
            splited = splited.slice(1);
            const ext = splited.join('.');

            if (ext && Object.keys(extensions).includes(ext)) {
                return extensions[ext as keyof typeof extensions];
            }
        }

        return 'file';
    }

    public toggle(): void {
        this.open = !this.open;
        this.clickFile.emit(this.name);
    }

    public get style(): string {
        return 'margin-left: ' + 10 * this.depth + 'px';
    }

    public get folder(): unknown {
        return this.content !== null && this.content !== undefined;
    }

    public handleClickFile(file: string): void {
        this.clickFile.emit(this.name + '/' + file);
    }

    public handleRightClickFile(event: MouseEvent): void {
        event.preventDefault();
        const pos = getAbsolutePosition(event.target);
        this.position = [pos.x + event.offsetX, pos.y + event.offsetY];
    }

    public handleRightClick(event: ContextMenuAction): void {
        this.contextMenuClick.emit([event[0], this.name + '/' + event[1]]);
    }

	@HostListener('document:contextmenu', ['$event'])
    public clickOut(event: MouseEvent): void {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.position = [-1000, -1000];
        }
    }
}
