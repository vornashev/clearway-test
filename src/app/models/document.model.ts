import { DocumentDto } from "./document.dto";
import { PageModel } from "./page.model";

export interface DocumentModel extends Pick<DocumentDto, 'name'> {
  pages: PageModel[]
}
