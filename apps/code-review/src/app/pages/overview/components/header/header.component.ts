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
    public panelOpenState = false;
    public readonly isMobile: boolean;

    constructor(
        private deviceService: DeviceDetectorService,
        public dialog: MatDialog
    ) {
        this.isMobile = this.deviceService.isMobile();
    }

    public openDialog(): void {
        this.dialog.open(ReviewRequestDetailsWindowComponent);
    }
}
