import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "percentage",
	standalone: true,
})
export class PercentagePipe implements PipeTransform {
	transform(value: number): string {
		const num = parseFloat((value * 100).toFixed(1));
		return `${num}%`;
	}
}
