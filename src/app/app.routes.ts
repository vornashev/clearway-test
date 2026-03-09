import { Routes } from '@angular/router';

import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { documentResolver } from './resolvers/document.resolver';

export const routes: Routes = [
  {
    path: ':id',
    component: DocumentViewerComponent,
    resolve: {
      document: documentResolver,
    },
  },
];
