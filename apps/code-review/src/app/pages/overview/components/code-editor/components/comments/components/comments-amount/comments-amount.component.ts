import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'acua-comments-amount',
    templateUrl: './comments-amount.component.html',
    styleUrls: ['./comments-amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsAmountComponent {
    @Input({ required: true })
    public amount!: number;
}
