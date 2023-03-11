import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material/dialog';
import { ReviewRequestDetailsWindowComponent } from './review-request-details-window';

@Component({
    selector: 'acua-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    public readonly isMobile = this.deviceService.isMobile();

    constructor(
        private readonly deviceService: DeviceDetectorService,
        private readonly dialog: MatDialog
    ) {}

    public onDetailsButtonClick(): void {
        this.dialog.open(ReviewRequestDetailsWindowComponent);
    }
}
