import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';

import sdk from '@stackblitz/sdk';

const STACK_BLITZ_ID = 'angular-community-project';

@Component({
    selector: 'acua-code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('stackblitzEditor') public stackblitzEditor!: ElementRef;
  public ngAfterViewInit(): void {
      this._initStackBlitzProject();
  }

  private _initStackBlitzProject(): void {
      sdk.embedProjectId(this.stackblitzEditor.nativeElement, STACK_BLITZ_ID, {
          width: '98%',
          height: '80%'
      });
  }
}
