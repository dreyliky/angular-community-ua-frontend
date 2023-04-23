import { InjectionToken } from '@angular/core';
import { ProjectEntity } from '@code-review/shared';

export const SOURCE_CODE = new InjectionToken<ProjectEntity[]>('SOURCE CODE');
