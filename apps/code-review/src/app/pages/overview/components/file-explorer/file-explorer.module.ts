import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileTreeNodeComponent } from './components';
import { FileExplorerComponent } from './file-explorer.component';
import { FileExplorerDepthState, FileSelectionState } from './states';

@NgModule({
    declarations: [FileExplorerComponent, FileTreeNodeComponent],
    imports: [CommonModule],
    exports: [FileExplorerComponent],
    providers: [FileExplorerDepthState, FileSelectionState]
})
export class FileExplorerModule {}
