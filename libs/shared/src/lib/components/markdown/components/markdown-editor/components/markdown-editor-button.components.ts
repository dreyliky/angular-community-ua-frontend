import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarkdownIconNameType } from '../types';

@Component({
    selector: 'acua-markdown-button',
    templateUrl: './markdown-editor-button.component.html'
})
export class MarkdownEditorButtonComponent {
    @Input()
    public iconName!: MarkdownIconNameType;

    @Output()
    public enumEmitter = new EventEmitter<Event>();
}
