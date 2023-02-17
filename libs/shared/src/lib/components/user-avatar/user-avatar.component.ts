import {
    Input,
    Component,
    ChangeDetectionStrategy,
    HostBinding, OnInit
} from '@angular/core';

import { SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'acua-user-avatar',
    styleUrls: ['./user-avatar.component.scss'],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {
  @Input()
    public userAvatarUrl!: string;

  @HostBinding('style.background-image')
  public backgroundImgUrl: SafeStyle = `url("assets/images/user-avatar.png")`;

  public ngOnInit(): void {
      this.setBackgroundUrl();
  }

  private setBackgroundUrl(): void {
      if (this.userAvatarUrl) {
          this.backgroundImgUrl = `url(${this.userAvatarUrl})`;
      }
  }
}
