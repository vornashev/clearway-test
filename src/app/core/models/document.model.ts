import { PageModel } from './page.model';
import { DocumentDto } from '../dto/document.dto';

export interface DocumentModel extends Pick<DocumentDto, 'name'> {
  pages: PageModel[];
}
