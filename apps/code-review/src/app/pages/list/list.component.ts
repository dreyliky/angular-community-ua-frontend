import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'acua-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
    protected readonly isMobile = inject(DeviceDetectorService).isMobile();
}
