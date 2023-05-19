import {
    ChangeDetectionStrategy,
    Component,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MarkdownInputDirective } from '../../directives';
import { MarkdownInputState, MarkdownViewModeState } from '../../states';
import { MarkdownButtonSyntax } from '../toolbar';

@Component({
    selector: 'acua-markdown-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownEditorComponent implements ControlValueAccessor {
    @ViewChild(MarkdownInputDirective)
    public readonly markdownEditorInputDirective!: MarkdownInputDirective;

    public readonly markdownViewMode$ = this.markdownViewModeState.data$;
    public readonly previewData$ = this.markdownInputState.data$;

    public onChange?: (value: string) => void;
    public onTouched?: () => void;

    constructor(
        @Optional() @Self() private readonly ngControl: NgControl,
        private readonly markdownViewModeState: MarkdownViewModeState,
        private readonly markdownInputState: MarkdownInputState
    ) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    public onMarkdownButtonClick(button: MarkdownButtonSyntax): void {
        this.markdownEditorInputDirective.insertMarkdownSyntax(button);
    }

    public writeValue(value: string): void {
        this.markdownInputState.set(value);
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
