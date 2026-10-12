import {
	Component,
	h,
	Listen,
	Prop,
	State,
	Event,
	EventEmitter,
	Element,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../internal/themed-host.component';
import { IconVariant } from '../../../types';
import { cn } from '../../../utils';

const dropzone = cva(
	[
		'group/dropzone',
		'flex h-inherit w-full flex-col items-center justify-center gap-2',
		'cursor-pointer',
		'rounded-lg',
		'border',
		'p-4',
	],
	{
		variants: {
			uploaded: {
				false: 'border-dashed',
				true: `border-solid`,
			},
			isOver: {
				true: [
					'border-dashed',
					'border-indigo-500 bg-indigo-50',
					'dark:border-indigo-700 dark:bg-indigo-700/10',
				],
				false: '',
			},
		},
		compoundVariants: [
			{
				uploaded: true,
				isOver: false,
				class: ['border-solid border-positive-green-500 bg-positive-green-50'],
			},
			{
				uploaded: false,
				isOver: false,
				class: [
					'border-white-800 bg-white-600',
					`hover:border-indigo-500 hover:bg-indigo-50`,
					`
       dark:border-white/10 dark:bg-white/5
       dark:hover:border-indigo-700 dark:hover:bg-indigo-700/10
     `,
				],
			},
		],
	}
);

export interface DropzoneResult {
	file: File;
	result: string;
}

export interface DropzoneUploadEvent {
	fileId: string;
	file?: File;
	result?: string;
	results?: DropzoneResult[];
}

@Component({
	tag: 'p-dropzone',
	styleUrl: 'dropzone.component.css',
	shadow: true,
})
export class Dropzone {
	/**
	 * Icon to show on the dropzone
	 */
	@Prop() icon: IconVariant = 'file-export';

	/**
	 * Wether to show the icon or not
	 */
	@Prop() showIcon = true;

	/**
	 * The type of files to accept
	 */
	@Prop() acceptGroup: 'any' | 'images' = 'any';

	/**
	 * The fileID to use to track the file
	 */
	@Prop() fileId: string;

	/**
	 * Wether the attachment is loading
	 */
	@Prop() loading = false;

	/**
	 * Allow multiple files
	 */
	@Prop() allowMultiple = true;

	/**
	 * Wether the file is uploaded
	 */
	@Prop() uploaded = false;

	/**
	 * String to use for "added" text
	 */
	@Prop() addedString: string = 'Toegevoegd';

	/**
	 * String to use for "title" text
	 */
	@Prop() dragFileString: string = 'Sleep je bestand hierheen';

	/**
	 * String to use for "description" text
	 */
	@Prop() orClickString: string = 'of klik om te uploaden';

	/**
	 * Event when upload is pressed
	 */
	@Event({
		bubbles: false,
	})
	upload: EventEmitter<DropzoneUploadEvent>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _isOver = false;

	private _fileRef: HTMLInputElement | undefined;
	private _filesToProcess = 0;
	private _results: DropzoneResult[] = [];

	private _documentBlocked = false;
	private _preventDefault = (ev: DragEvent) => ev.preventDefault();

	componentWillRender() {
		if (!this._isOver && this._documentBlocked) {
			document.removeEventListener('drop', this._preventDefault);
			document.removeEventListener('dragover', this._preventDefault);

			this._documentBlocked = false;
			return;
		}

		if (!this._isOver) {
			return;
		}

		document.addEventListener('drop', this._preventDefault);
		document.addEventListener('dragover', this._preventDefault);
		this._documentBlocked = true;
	}

	render() {
		const hasContent = this._el.innerHTML?.length > 0;

		return (
			<ThemedHost>
				<div
					class={dropzone({
						isOver: this._isOver,
						uploaded: this.uploaded,
					})}
					onClick={() => this._uploadClick()}
				>
					{!this.loading && this.showIcon && (
						<p-icon
							class={cn(
								`
          group-hover/dropzone:text-indigo-900
          dark:group-hover/dropzone:text-indigo-700
        `,
								{
									'text-positive-green-800': this.uploaded,
									'text-storm-300 dark:text-hurricane-200':
										!this._isOver && !this.uploaded,
									'text-indigo-900 dark:text-indigo-700': this._isOver,
								}
							)}
							variant={this.icon}
						/>
					)}

					{this.loading && <p-loader />}

					{hasContent && (
						<p
							class={cn('m-0 p-0 text-lg font-bold', {
								'dark:text-white': !this.uploaded || this._isOver,
								'text-storm-500': this.uploaded && !this._isOver,
							})}
						>
							<slot />
						</p>
					)}

					{this.uploaded && !this._isOver && (
						<div class='flex items-center gap-2 text-positive-green-800'>
							<p-icon variant='check-circle' />
							<span class='font-medium'>{this.addedString}</span>
						</div>
					)}

					{(!this.uploaded || this._isOver) && (
						<div
							class={cn(
								[
									'flex flex-col text-center',
									'group-hover/dropzone:opacity-50',
									`
           text-storm-300
           dark:text-hurricane-300
         `,
								],
								{
									'opacity-50': this._isOver,
								}
							)}
						>
							<span class='font-medium'>{this.dragFileString}</span>
							<span class='font-normal'>{this.orClickString}</span>
						</div>
					)}
				</div>

				<input
					accept={this.acceptGroup == 'any' ? '' : 'image/*'}
					class='hidden'
					multiple={this.allowMultiple === true ? true : undefined}
					ref={el => (this._fileRef = el)}
					type='file'
					onChange={ev => this._onFileChange(ev)}
				/>
			</ThemedHost>
		);
	}

	@Listen('drop')
	onDrop(ev: DragEvent) {
		const files = this._getFiles(ev);

		if (!files?.length) {
			return;
		}

		this._isOver = false;
		this._processFiles(files);
	}

	@Listen('dragover')
	onDragOver(ev: DragEvent) {
		if (!this._isFilesEvent(ev)) {
			return;
		}

		this._isOver = true;
	}

	@Listen('dragleave')
	onDragLeave() {
		this._isOver = false;
	}

	private _isFilesEvent(ev: DragEvent) {
		if (!ev.dataTransfer) {
			return false;
		}

		const files = [...ev.dataTransfer.items].filter(
			item => item.kind === 'file'
		);

		if (files.length === 0) {
			return false;
		}

		return true;
	}

	private _getFiles(ev: DragEvent) {
		if (!this._isFilesEvent(ev)) {
			return;
		}

		const files = ev.dataTransfer?.files ?? [];
		if (files.length === 0) {
			return;
		}

		return [...files];
	}

	private _uploadClick() {
		if (!this._fileRef) {
			return;
		}

		this._fileRef.click();
	}

	private _onFileChange(ev: Event) {
		const target = ev.target as HTMLInputElement;
		if (!target.files) {
			return;
		}

		const files = [...target.files];

		if (!files?.length) {
			return;
		}

		this._processFiles(files);
	}

	private _processFiles(files: File[]) {
		this._results = [];

		if (!this.allowMultiple) {
			files = [files[0]];
		}

		this._filesToProcess = files.length;
		for (const file of files) {
			this._processFile(file);
		}
	}

	private _processFile(file: File) {
		this.loading = true;

		const reader = new FileReader();
		reader.addEventListener('load', (e: any) =>
			this._onLoad(file, e?.currentTarget?.result)
		);
		reader.readAsDataURL(file);
	}

	private _onLoad(file: File, result: string) {
		this._results.push({
			file,
			result,
		});

		if (this._results?.length < this._filesToProcess) {
			return;
		}

		const data: DropzoneUploadEvent = {
			fileId: this.fileId,
			results: this._results,
		};

		if (this._results.length === 1 || !this.allowMultiple) {
			data.file = this._results[0].file;
			data.result = this._results[0].result;
		}

		this.upload.emit(data);

		if (this._fileRef) {
			this._fileRef.value = '';
		}

		this.loading = false;
	}
}
