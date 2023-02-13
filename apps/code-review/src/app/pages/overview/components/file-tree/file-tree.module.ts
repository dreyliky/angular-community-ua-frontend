import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileTreeNodeComponent } from './file-tree-node/file-tree-node.component';
import { FileTreeComponent } from './file-tree.component';

@NgModule({
    declarations: [FileTreeComponent, FileTreeNodeComponent],
    imports: [CommonModule],
    exports: [FileTreeComponent]
})
export class FileTreeModule {}
