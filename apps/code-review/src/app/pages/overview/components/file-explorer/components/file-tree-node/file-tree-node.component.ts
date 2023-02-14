/* eslint-disable no-mixed-spaces-and-tabs */
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef, EventEmitter, HostListener,
    Input,
    Output
} from '@angular/core';
import { extensions, files, folders } from '../../data';
import {
    ElementOffsetPosition
} from '../../interfaces';
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
    public content: MonacoTreeElement[] | undefined | null = undefined;

    @Input()
	public depth = 0;

    @Input()
    public theme: 'vs-dark' | 'vs-light' = 'vs-dark';

    @Input()
    public hide = false;

	@Output()
    public clickFile = new EventEmitter<string>();

	public get marginLeftStyleValue(): string {
	    return `${10 * this.depth}px`;
	}

	public get isContent(): boolean {
	    return this.content !== null && this.content !== undefined;
	}

	public get isHide(): boolean {
	    return !this.isOpened || this.hide;
	}

	// eslint-disable-next-line max-lines-per-function
	public get icon(): any {
	    if (this.isContent) {
	        if (Object.keys(folders).includes(this.name)) {
	            const icon = folders[this.name as keyof typeof folders];

	            if (this.isOpened) {
	                return icon + '-open';
	            }

	            return icon;
	        }

	        if (this.isOpened) {
	            return 'folder-open';
	        }

	        return 'folder';
	    }

	    if (Object.keys(files).includes(this.name)) {
	        return this.getFiles();
	    }

	    let splittedName = this.name.split('.');

	    while (splittedName.length > 0) {
	        splittedName = splittedName.slice(1);
	        const joinedExtensionName = splittedName.join('.');

	        if (splittedName && Object.keys(extensions).includes(joinedExtensionName)) {
	            return this.getExtensions(joinedExtensionName);
	        }
	    }

	    return 'file';
	}

	public get depthIncrement(): number {
	    return this.depth + 1;
	}

	public get fileExplorerImageSrc(): string {
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

	public isOpened = false;

	public position: [number, number] | undefined = undefined;

	constructor(private elementRef: ElementRef) {}

	public onButtonToggle(): void {
	    this.isOpened = !this.isOpened;
	    this.clickFile.emit(this.name);
	}

	public handleClickFile(file: string): void {
	    this.clickFile.emit(this.name + '/' + file);
	}

	public handleRightClickFile(event: MouseEvent): void {
	    event.preventDefault();

	    const elementOffsetPosition = this.getAbsolutePosition(event.target as HTMLDivElement);
	    this.position = [
	        elementOffsetPosition.x + event.offsetX,
	        elementOffsetPosition.y + event.offsetY
	    ];
	}

    @HostListener('document:contextmenu', ['$event'])
	private isClickOut(event: MouseEvent): void {
	    if (!this.elementRef.nativeElement.contains(event.target)) {
	        this.position = [-1000, -1000];
	    }
	}

    private getFiles(): string {
        return files[this.name as keyof typeof files];
    }

    private getExtensions(splittedName: string): string {
        return extensions[splittedName as keyof typeof extensions];
    }

    private getAbsolutePosition(element: HTMLDivElement): ElementOffsetPosition {
	    const elementOffsetPosition = { x: element.offsetLeft, y: element.offsetTop };

	    if (element.offsetParent) {
	        const parentElement = element.offsetParent as HTMLDivElement;
	        const parentElementOffsetPosition = this.getAbsolutePosition(parentElement);

	        elementOffsetPosition.x += parentElementOffsetPosition.x;
	        elementOffsetPosition.y += parentElementOffsetPosition.y;
	    }

	    return elementOffsetPosition;
    }
}
