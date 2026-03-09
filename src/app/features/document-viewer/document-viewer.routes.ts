import { Routes } from '@angular/router';

import { documentResolver } from './resolvers/document.resolver';

export const documentViewerRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./components/document-viewer/document-viewer.component').then(
        m => m.DocumentViewerComponent
      ),
    resolve: {
      document: documentResolver,
    },
  },
];
