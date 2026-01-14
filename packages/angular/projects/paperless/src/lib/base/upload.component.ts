import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export abstract class BaseUploadComponent {
	@Input() fileId?: string;
	@Input() uploaded = false;
	@Input()
	set loading(value: boolean) {
		this.loading$.next(value);
	}

	@Output() fileChange = new EventEmitter<any>();

	@ViewChild('uploaderInput') uploaderInput?: ElementRef;
	public file?: File;

	public loading$ = new BehaviorSubject(false);

	onChange($event: Event) {
		const target = $event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			this.loading$.next(true);

			const reader = new FileReader();
			reader.onload = (e: any) => this.onLoad(file, e?.currentTarget?.result);
			reader.readAsDataURL(file);
		}
	}

	onLoad(file: File, result: string) {
		this.fileChange.next({
			fileId: this.fileId,
			result,
			file,
		});

		if (this.uploaderInput?.nativeElement) {
			this.uploaderInput.nativeElement.value = '';
		}

		this.file = file;
		this.loading$.next(false);
	}
}
