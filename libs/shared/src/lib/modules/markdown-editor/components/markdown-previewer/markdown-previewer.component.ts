import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import * as MarkdownIt from 'markdown-it';

type OptionalData = string | undefined | null;

@Component({
    selector: 'acua-markdown-previewer',
    template: '',
    styleUrls: ['./markdown-previewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'acua-markdown-previewer'
    }
})
export class MarkdownPreviewerComponent {
    @Input({ required: true })
    public set data(data: OptionalData) {
        this.onNewData(data);
    }

    private static readonly engine = new MarkdownIt({
        linkify: true,
        breaks: false
    });

    @HostBinding('innerHTML')
    protected previewAsHtml: string = '';

    private onNewData(data: OptionalData): void {
        if (data) {
            this.previewAsHtml = MarkdownPreviewerComponent.engine.render(data);
        } else {
            this.previewAsHtml = '';
        }
    }
}
