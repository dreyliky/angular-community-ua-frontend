import { ScreenModule, UserAvatarModule, UtilsModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header.component';
import { ReviewRequestDetailsAccordionComponent } from './review-request-details-accordion';
import { ReviewRequestDetailsWindowComponent } from './review-request-details-window';

@NgModule({
    declarations: [
        HeaderComponent,
        ReviewRequestDetailsWindowComponent,
        ReviewRequestDetailsAccordionComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        MatExpansionModule,
        MatSidenavModule,
        MatDialogModule,
        MatButtonModule,
        UserAvatarModule,
        UtilsModule,
        ScreenModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
