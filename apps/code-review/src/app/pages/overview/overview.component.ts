import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild } from '@angular/core';

import sdk from '@stackblitz/sdk';

const STACK_BLITZ_ID = 'angular-community-project';
@Component({
    selector: 'acua-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewComponent implements AfterViewInit {
  @ViewChild('stackblitzEditor') public stackblitzEditor!: ElementRef;
  public ngAfterViewInit(): void {
      this._initStackBlitzProject();
  }

  private _initStackBlitzProject(): void {
      sdk.embedProjectId(this.stackblitzEditor.nativeElement, STACK_BLITZ_ID, {
          openFile: 'index.ts,src/App.tsx',
          width: '98%',
          height: '80%'
      });
  }
}
