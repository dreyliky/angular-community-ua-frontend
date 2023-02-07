import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRouteEnum } from './core/enums/app-route-enum';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    loadChildren: () =>
                        import('./remote-entry/entry.module').then(
                            (m) => m.RemoteEntryModule
                        )
                },
                {
                    path: AppRouteEnum.LIST,
                    loadChildren: () =>
                        import('./pages/list/list.module').then(
                            (m) => m.ListModule
                        )
                },
                {
                    path: AppRouteEnum.REQUEST,
                    loadChildren: () =>
                        import('./pages/request/request.module').then(
                            (m) => m.RequestModule
                        )
                },
                {
                    path: AppRouteEnum.OVERVIEW,
                    loadChildren: () =>
                        import('./pages/overview/overview.module').then(
                            (m) => m.OverviewModule
                        )
                }
            ],
            { initialNavigation: 'enabledBlocking' }
        )
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
