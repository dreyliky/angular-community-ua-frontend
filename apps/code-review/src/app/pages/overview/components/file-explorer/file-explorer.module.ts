import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    imports: [CommonModule],
    exports: [FileExplorerComponent]
})
export class FileExplorerModule {}
