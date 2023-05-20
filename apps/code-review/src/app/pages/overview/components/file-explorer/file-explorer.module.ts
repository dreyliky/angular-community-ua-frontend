import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    EntityNodesComponent,
    FileNodeComponent,
    FolderNodeComponent
} from './components';
import { FileExplorerComponent } from './file-explorer.component';

@NgModule({
    declarations: [
        FileExplorerComponent,
        EntityNodesComponent,
        FileNodeComponent,
        FolderNodeComponent
    ],
    imports: [CommonModule, MatTooltipModule],
    exports: [FileExplorerComponent]
})
export class FileExplorerModule {}
