import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'acua-user-avatar',
    templateUrl: './user-avatar.component.html',
    styleUrls: ['./user-avatar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {
  @Input() public userAvatarSrc!: string;
  @Input() public userName!: string;
}
