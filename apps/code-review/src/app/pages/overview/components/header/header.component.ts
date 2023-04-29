import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ReviewRequestDetailsWindowComponent } from './review-request-details-window';

@Component({
    selector: 'acua-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    public readonly isMobile = inject(DeviceDetectorService).isMobile();

    @Output()
    public readonly hamburgerMenuButtonClick = new EventEmitter<MouseEvent>();

    constructor(private readonly dialog: MatDialog) {}

    public onDetailsButtonClick(): void {
        this.dialog.open(ReviewRequestDetailsWindowComponent);
    }
}
