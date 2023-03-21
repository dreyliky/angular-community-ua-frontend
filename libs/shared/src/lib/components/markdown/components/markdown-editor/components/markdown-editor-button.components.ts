import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoldButtonClass } from '../classes/bold-button.class';
import { HeaderButtonClass } from '../classes/header-button.class';
import { ItalicButtonClass } from '../classes/italic-button.class';
import { MarkdownSyntaxEnum } from '../enums';

@Component({
    selector: 'acua-markdown-button',
    template: `<button (click)="enumEmitter.emit(class.enumMember)" mat-fab>
        <mat-icon>{{ class.matIconName }}</mat-icon>
    </button>`
})
export class MarkdownEditorButtonComponent {
    @Input()
    public class!: BoldButtonClass | ItalicButtonClass | HeaderButtonClass;

    @Output()
    public enumEmitter = new EventEmitter<MarkdownSyntaxEnum>();
}
