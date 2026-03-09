import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'document/1',
    pathMatch: 'full',
  },
  {
    path: 'document',
    loadChildren: () =>
      import('./features/document-viewer/document-viewer.routes').then(
        m => m.documentViewerRoutes
      ),
  },
];
