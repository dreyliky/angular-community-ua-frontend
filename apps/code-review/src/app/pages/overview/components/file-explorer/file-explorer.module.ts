import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileTreeNodeComponent } from './components';
import { FileExplorerComponent } from './file-explorer.component';

@NgModule({
    declarations: [FileExplorerComponent, FileTreeNodeComponent],
    imports: [CommonModule],
    exports: [FileExplorerComponent]
})
export class FileExplorerModule {}
