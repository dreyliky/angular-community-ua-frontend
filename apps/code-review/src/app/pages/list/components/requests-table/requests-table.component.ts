import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteEnum } from '@code-review/core';

const ELEMENT_DATA = [
    { name: 'Test1', date: new Date(), user: 'Ivan' },
    { name: 'Test2', date: new Date(), user: 'Petro' },
    { name: 'Test3', date: new Date(), user: 'Vasyl' },
    { name: 'Test4', date: new Date(), user: 'Rostyslav' },
    { name: 'Test5', date: new Date(), user: 'Dima' }
];

@Component({
    selector: 'acua-requests-table',
    templateUrl: './requests-table.component.html',
    styleUrls: ['./requests-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTableComponent {
    public readonly dataSource = ELEMENT_DATA;
    public readonly displayedColumns: string[] = ['name', 'date', 'user'];

    constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {}

    public onTableRowClick(id: number): void {
        this.router.navigate([`../${AppRouteEnum.Overview}/${id}`], {
            relativeTo: this.activatedRoute
        });
    }
}
