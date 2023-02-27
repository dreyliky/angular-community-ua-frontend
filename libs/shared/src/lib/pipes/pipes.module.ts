import { NgModule } from '@angular/core';
import { SafeResourceUrlPipe } from './safe-resource-url.pipe';

@NgModule({
    declarations: [SafeResourceUrlPipe],
    exports: [SafeResourceUrlPipe]
})
export class PipesModule {}
