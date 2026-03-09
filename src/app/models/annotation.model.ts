import { Position } from './position.model';

export interface Annotation extends Position {
  id: string;
  text: string;
  imageUrl?: string;
}
