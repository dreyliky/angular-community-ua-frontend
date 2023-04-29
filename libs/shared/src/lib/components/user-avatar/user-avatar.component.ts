import { Input, Component, ChangeDetectionStrategy, HostBinding, OnChanges } from '@angular/core';

import { SafeStyle } from '@angular/platform-browser';

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
    public backgroundImgUrl: SafeStyle = `url(${DEFAULT_URL})`;

    public ngOnChanges(): void {
        this.setBackgroundUrl();
    }

    private setBackgroundUrl(): void {
        this.backgroundImgUrl = `url(${this.avatarUrl ? this.avatarUrl : DEFAULT_URL})`;
    }
}
