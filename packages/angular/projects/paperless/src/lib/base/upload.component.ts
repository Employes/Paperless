import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	effect,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';

@Component({
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseUploadComponent {
	readonly fileId = input<string>();
	readonly uploaded = input(false);
	readonly loading = input(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly fileChange = output<any>();

	readonly uploaderInput = viewChild<ElementRef>('uploaderInput');
	readonly loadingParsed = signal(false);

	public file?: File;

	constructor() {
		effect(() => {
			const loading = this.loading();
			this.loadingParsed.set(loading);
		});
	}

	onChange($event: Event) {
		const target = $event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			this.loadingParsed.set(true);

			const reader = new FileReader();
			reader.addEventListener('load', _ => this.onLoad(file, reader.result));
			reader.readAsDataURL(file);
		}
	}

	onLoad(file: File, result: string | ArrayBuffer | null) {
		this.fileChange.emit({
			fileId: this.fileId(),
			result,
			file,
		});

		const uploaderInput = this.uploaderInput();
		if (uploaderInput?.nativeElement) {
			uploaderInput.nativeElement.value = '';
		}

		this.file = file;
		this.loadingParsed.set(false);
	}
}
