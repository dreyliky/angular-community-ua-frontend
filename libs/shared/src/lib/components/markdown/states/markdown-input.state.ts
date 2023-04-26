import { Injectable } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { BaseState, NgxState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class MarkdownInputState extends BaseState<string> {
    public get markdownData(): string {
        return new MarkdownIt().render(this.data ?? '');
    }
}
