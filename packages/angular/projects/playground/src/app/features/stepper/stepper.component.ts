import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'stepper.component.html',
	standalone: true,
	imports: [PaperlessModule, AsyncPipe, NgFor],
})
export class StepperComponent {
	public steps$ = new BehaviorSubject([0, 1, 2]);
	public activeStep$ = new BehaviorSubject(2);

	async add() {
		const originalSteps = await firstValueFrom(this.steps$);
		const steps = [...originalSteps];

		steps.push(steps.length + 1);

		this.steps$.next(steps);
	}

	async remove(i: number) {
		const originalSteps = await firstValueFrom(this.steps$);
		const steps = [...originalSteps];

		steps.splice(i, 1);

		this.steps$.next(steps);
	}

	async randomizeActiveStep() {
		const originalSteps = await firstValueFrom(this.steps$);
		const activeStep = Math.floor(Math.random() * originalSteps.length) + 1;

		this.activeStep$.next(activeStep);
	}
}
