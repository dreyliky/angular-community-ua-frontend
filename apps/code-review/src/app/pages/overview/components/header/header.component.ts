import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewRequestDetailsWindowComponent } from './review-request-details-window';

@Component({
    selector: 'acua-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Output()
    public readonly hamburgerMenuButtonClick = new EventEmitter<MouseEvent>();

    constructor(private readonly dialog: MatDialog) {}

    public onDetailsButtonClick(): void {
        this.dialog.open(ReviewRequestDetailsWindowComponent);
    }
}
