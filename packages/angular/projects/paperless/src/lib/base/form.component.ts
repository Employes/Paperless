import { Component } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormControl,
	FormGroup,
} from '@angular/forms';

@Component({
	template: ``,
})
export abstract class BaseFormComponent {
	public markedDirty = false;

	scrollToFirstError() {
		const invalidInputs = Array.from(
			document.getElementsByClassName('ng-invalid')
		)
			.filter(e => e?.nodeName?.toLowerCase() !== 'form')
			.sort((a, b) => a.scrollTop - b.scrollTop);
		const first = invalidInputs[0];

		if (first) {
			first.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		}
	}

	markControlDirty(
		control: FormControl | FormGroup | FormArray | AbstractControl
	) {
		if (control instanceof FormControl) {
			control.markAsDirty({ onlySelf: true });
			control.markAsTouched({ onlySelf: true });
		} else if (control instanceof FormGroup) {
			control.markAsDirty();
			control.markAsTouched();
			this.markAllDirty(control);
		} else if (control instanceof FormArray) {
			control.markAsDirty();
			control.markAsTouched();
			for (const child of control?.controls) {
				this.markControlDirty(child);
			}
		}
	}

	markAllDirty(formGroup: FormGroup) {
		this.markedDirty = true;

		for (const field of Object.keys(formGroup.controls)) {
			const control = formGroup.get(field);
			this.markControlDirty(control as AbstractControl);
		}
	}

	getControlError(
		control: FormControl | AbstractControl | FormArray | FormGroup
	) {
		if (!this.hasControlError(control)) {
			return;
		}

		return this.firstControlError(control);
	}

	hasControlError(
		control: FormControl | AbstractControl | FormGroup | FormArray,
		showChildErrors = true
	) {
		return control?.dirty && this.firstControlError(control, showChildErrors);
	}

	firstControlError(
		control: FormControl | AbstractControl | FormGroup | FormArray,
		showChildErrors = true
	): string | undefined {
		if (control instanceof FormGroup && showChildErrors) {
			const errors: Array<string | undefined> = Object.keys(control.controls)
				.map(key => this.firstControlError(control.controls[key]))
				.filter(val => !!val);

			return errors[0];
		}

		if (!control?.errors) {
			return;
		}

		const keys = Object.keys(control.errors);
		let err: string | undefined;

		for (const key of keys) {
			if (control.errors[key]) {
				err = key;
				break;
			}
		}

		return err;
	}

	resetControl(control: FormControl | FormGroup | FormArray | AbstractControl) {
		control.setErrors(null);
		control.reset();
		control.markAsPristine();

		if (control instanceof FormGroup) {
			this.resetForm(control);
		} else if (control instanceof FormArray) {
			for (const child of control?.controls) {
				this.resetControl(child);
			}
		}
	}

	resetForm(formGroup: FormGroup) {
		for (const field of Object.keys(formGroup.controls)) {
			const control = formGroup.get(field);
			this.resetControl(control as AbstractControl);
		}

		this.markedDirty = false;
	}
}
