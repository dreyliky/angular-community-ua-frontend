import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'acua-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
    @Input()
    public amount!: number;
}
