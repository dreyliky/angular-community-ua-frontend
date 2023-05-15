import { MarkdownEditorModule, UserAvatarModule } from '@acua/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileExplorerModule } from '../file-explorer';
import { CommentsComponent } from './components';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [SidebarComponent, CommentsComponent],
    imports: [
        CommonModule,
        UserAvatarModule,
        MarkdownEditorModule,
        MatExpansionModule,
        FileExplorerModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    exports: [SidebarComponent]
})
export class SidebarModule {}
