import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-comments-amount',
    templateUrl: './comments-amount.component.html',
    styleUrls: ['./comments-amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsAmountComponent {}
