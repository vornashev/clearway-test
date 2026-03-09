import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DocumentDto } from '../dto';

@Injectable({ providedIn: 'root' })
export class DocumentApiService {
  private readonly http = inject(HttpClient);

  getById(id: number | string): Observable<DocumentDto> {
    return this.http.get<DocumentDto>(`api/${id}.json`);
  }
}
