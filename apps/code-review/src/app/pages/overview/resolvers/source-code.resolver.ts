import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MonacoTreeNode, ProjectSourceUrlService } from '@code-review/shared';
import { Observable } from 'rxjs';

@Injectable()
export class SourceCodeResolver
    implements Resolve<MonacoTreeNode[]>
{
    constructor(
        private readonly projectSourceUrlService: ProjectSourceUrlService
    ) {}

    public resolve(): Observable<MonacoTreeNode[]> {
        return this.projectSourceUrlService.getSource(
            'https%3A%2F%2Fgithub.com%2Fdreyliky%2Fangular-community-ua-backend'
        );

    }
}
