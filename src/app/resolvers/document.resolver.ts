import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { DocumentApiService } from '../services/api/document-api.service';
import { PageDto } from '../models';

export const documentResolver: ResolveFn<PageDto> = (
  route: ActivatedRouteSnapshot
) => {
  const documentApi = inject(DocumentApiService);
  const documentId = route.paramMap.get('id')!;
  return documentApi.getListById(documentId);
};
