import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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

    protected readonly isMobile = inject(DeviceDetectorService).isMobile();
}
