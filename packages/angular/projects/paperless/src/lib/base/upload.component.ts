import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewChild,
	effect,
	input,
	output,
	signal,
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

	@ViewChild('uploaderInput') uploaderInput?: ElementRef;
	public file?: File;

	public loadingParsed = signal(false);

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

		if (this.uploaderInput?.nativeElement) {
			this.uploaderInput.nativeElement.value = '';
		}

		this.file = file;
		this.loadingParsed.set(false);
	}
}
