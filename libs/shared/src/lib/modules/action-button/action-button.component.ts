import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'acua-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonComponent {
    @Input()
    public label!: string;

    @Input()
    public iconName!: string;

    @Input()
    public isDisabled: boolean = false;
}
