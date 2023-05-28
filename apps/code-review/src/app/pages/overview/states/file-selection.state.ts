import { Injectable } from '@angular/core';
import { ProjectFile } from '@code-review/shared';
import { NgxState, ObjectState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class ProjectFileSelectionState extends ObjectState<ProjectFile> {}
