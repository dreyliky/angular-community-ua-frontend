import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'acua-header-user',
    templateUrl: './header-user.component.html',
    styleUrls: ['./header-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
    public readonly codeReviewLink = '/code-review';
}
