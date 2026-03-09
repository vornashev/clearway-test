import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { DocumentApiService } from '../../../core/api/document-api.service';
import { DocumentDto } from '../../../core/dto';

export const documentResolver: ResolveFn<DocumentDto> = (
  route: ActivatedRouteSnapshot
) => {
  const documentApi = inject(DocumentApiService);
  const documentId = route.paramMap.get('id')!;
  return documentApi.getById(documentId);
};
