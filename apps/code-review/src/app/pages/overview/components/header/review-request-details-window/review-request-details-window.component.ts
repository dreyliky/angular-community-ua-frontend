import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'acua-review-request-details-window',
    templateUrl: './review-request-details-window.component.html',
    styleUrls: ['./review-request-details-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestDetailsWindowComponent {
    constructor(
        public dialogRef: MatDialogRef<ReviewRequestDetailsWindowComponent>
    ) {}

    public onClose(): void {
        this.dialogRef.close();
    }
}
