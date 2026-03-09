import { Annotation } from "./annotation.model";
import { PageDto } from "./page.dto";

export interface PageModel extends PageDto {
  annotations: Annotation[]
}
