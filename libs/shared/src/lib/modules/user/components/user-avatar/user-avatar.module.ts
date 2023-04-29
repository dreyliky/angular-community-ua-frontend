import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar.component';

@NgModule({
    declarations: [UserAvatarComponent],
    imports: [CommonModule],
    exports: [UserAvatarComponent]
})
export class UserAvatarModule {}
