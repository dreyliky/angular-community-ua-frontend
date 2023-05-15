import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownButtonSyntax } from './components';
import { MarkdownInputDirective } from './directives';
import { MarkdownInputState, MarkdownViewModeState } from './states';

@Component({
    selector: 'acua-markdown [formControl]',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MarkdownComponent),
            multi: true
        }
    ]
})
export class MarkdownComponent implements ControlValueAccessor {
    @ViewChild(MarkdownInputDirective)
    public readonly markdownEditorInputDirective!: MarkdownInputDirective;

    public readonly markdownViewMode$ = this.markdownViewModeState.data$;
    public readonly previewData$ = this.markdownInputState.data$;

    private onChange!: (value: string) => void;
    private onTouched!: () => void;

    constructor(
        private readonly markdownViewModeState: MarkdownViewModeState,
        private readonly markdownInputState: MarkdownInputState
    ) {}

    public onMarkdownButtonClick(button: MarkdownButtonSyntax): void {
        this.markdownEditorInputDirective.insertMarkdownSyntax(button);
    }

    public onMarkdownInputValueChange(value: string): void {
        this.onChange(value);
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
