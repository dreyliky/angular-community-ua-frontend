import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentZoneComponent, CommentsAmountComponent } from './components';

@NgModule({
    declarations: [CommentsAmountComponent, CommentZoneComponent],
    imports: [CommonModule],
    exports: [CommentsAmountComponent, CommentZoneComponent]
})
export class CommentsModule {}
