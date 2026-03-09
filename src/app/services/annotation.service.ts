import { Injectable } from "@angular/core";
import { Annotation } from "../models/annotation.model";
import { Position } from "../models/position.model";

@Injectable({ providedIn: "root" })
export class AnnotationService {
	// readonly map = new Map<number, Annotation>();

	add(newAnnotation: Annotation) {
		// this.map.set(newAnnotation.pageNumber, newAnnotation);
	}

	delete(id: string) {
		// this.map.set(newAnnotation.pageNumber, newAnnotation);
	}

	move(id: string, position: Position) {}
}
