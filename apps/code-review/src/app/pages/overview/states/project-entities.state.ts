import { Injectable } from '@angular/core';
import { ProjectEntity } from '@code-review/shared';
import { ArrayState, NgxState } from 'ngx-base-state';

@NgxState()
@Injectable()
export class ProjectEntitiesState extends ArrayState<ProjectEntity> {}
