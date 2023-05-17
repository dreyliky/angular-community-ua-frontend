import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-comment-zone',
    templateUrl: './comment-zone.component.html',
    styleUrls: ['./comment-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentZoneComponent {}
