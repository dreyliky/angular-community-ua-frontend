import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProjectEntity, ReviewRequestSourceCodeService } from '@code-review/shared';
import { Observable } from 'rxjs';
import { OverviewParamEnum } from '../enums';

@Injectable()
export class SourceCodeResolver implements Resolve<ProjectEntity[]> {
    constructor(private readonly sourceCodeService: ReviewRequestSourceCodeService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<ProjectEntity[]> {
        return this.sourceCodeService.get(route.params[OverviewParamEnum.Id]);
    }
}
