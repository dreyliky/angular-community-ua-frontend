import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FileExplorerModule } from '../file-explorer';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule, MatExpansionModule, FileExplorerModule],
    exports: [SidebarComponent]
})
export class SidebarModule {}
