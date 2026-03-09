import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { PageDto } from "../../models";

@Injectable({ providedIn: "root" })
export class DocumentApiService {
	private readonly http = inject(HttpClient);

	getListById(id: number | string): Observable<PageDto> {
		return this.http.get<PageDto>(`api/${id}.json`);
	}
}
