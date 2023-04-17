import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from '@angular/core';

const DEFAULT_URL = 'assets/images/user-avatar.png';

@Component({
    selector: 'acua-user-avatar',
    styleUrls: ['./user-avatar.component.scss'],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnChanges {
    @Input()
    public avatarUrl!: string;

    @HostBinding('style.background-image')
    public backgroundImgUrl = `url(${DEFAULT_URL})`;

    public ngOnChanges(): void {
        this.setBackgroundUrl();
    }

    private setBackgroundUrl(): void {
        this.backgroundImgUrl = `url(${this.avatarUrl ? this.avatarUrl : DEFAULT_URL})`;
    }
}
