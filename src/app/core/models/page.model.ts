import { Annotation } from './annotation.model';
import { PageDto } from '../dto/page.dto';

export interface PageModel extends PageDto {
  annotations: Annotation[];
}
