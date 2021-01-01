import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                loadChildren: () => import('./sources-page/sources-page.module').then(m => m.SourcesPageModule)
            },
            {
                path: 'add',
                loadChildren: () => import('./add-source/add-source.module').then(m => m.AddSourceModule)
            },
            {
                path: 'irregularsourcenames',
                loadChildren: () => import('./irregularsourcenames/irregularsourcenames.module').then(m => m.IrregularsourcenamesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SourcesRoutingModule { }
