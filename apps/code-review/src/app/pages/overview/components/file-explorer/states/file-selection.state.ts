import { Injectable } from '@angular/core';
import { ProjectFile } from '@code-review/shared';
import { ObjectState } from 'ngx-base-state';

@Injectable()
export class FileSelectionState extends ObjectState<ProjectFile> {}
