import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

const tooltipOptions: MatTooltipDefaultOptions = {
    showDelay: 400,
    hideDelay: 400,
    touchendHideDelay: 400
};
@Component({
    selector: 'acua-markdown-button',
    templateUrl: './markdown-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipOptions }]
})
export class MarkdownButtonComponent {
    @Input()
    public iconName!: string;

    @Input()
    public tooltipInfo!: string;
}
