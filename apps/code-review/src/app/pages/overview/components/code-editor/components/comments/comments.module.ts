import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentComponent, CommentsAmountComponent } from './components';

@NgModule({
    declarations: [CommentsAmountComponent, CommentComponent],
    imports: [CommonModule],
    exports: [CommentsAmountComponent, CommentComponent]
})
export class CommentsModule {}
