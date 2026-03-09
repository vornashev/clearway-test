import { PageDto } from './page.dto';

export interface DocumentDto {
  readonly name: string;
  readonly pages: PageDto[];
}
