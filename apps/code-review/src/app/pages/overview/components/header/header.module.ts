import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header.component';
import { UserAvatarModule } from '@acua/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewRequestDetailsWindowComponent } from './review-request-details-window';

@NgModule({
    declarations: [HeaderComponent, ReviewRequestDetailsWindowComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        MatExpansionModule,
        MatSidenavModule,
        MatDialogModule,
        MatButtonModule,
        UserAvatarModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
