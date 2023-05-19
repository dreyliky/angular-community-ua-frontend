import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';
import {
    FileOpenerDirective,
    LineCommentsAmountDirective,
    LineHighlighterDirective,
    TextSelectionDisablerDirective
} from './directives';
import { MONACO_API_PROVIDER, MONACO_EDITOR_PROVIDER } from './providers';
import { EditorService, LanguageService } from './services';
import { EditorCommentsState } from './states';

@Component({
    selector: 'acua-code-editor',
    template: '',
    styleUrls: ['./code-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'acua-code-editor'
    },
    hostDirectives: [
        LineHighlighterDirective,
        LineCommentsAmountDirective,
        TextSelectionDisablerDirective,
        FileOpenerDirective
    ],
    providers: [
        MONACO_EDITOR_PROVIDER,
        MONACO_API_PROVIDER,
        EditorService,
        LanguageService,
        EditorCommentsState
    ]
})
export class CodeEditorComponent {}
