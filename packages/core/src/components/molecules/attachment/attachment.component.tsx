import {
	Component,
	Event,
	EventEmitter,
	Fragment,
	h,
	Prop,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

import { cn, isMobile, isTablet } from '../../../utils';

const attachment = cva(
	[
		'flex flex-1 items-center justify-start gap-2',
		'h-8 min-w-0 px-2 rounded-lg',
		'border border-solid',
		'bg-white-600 text-storm-200',
		'dark:bg-white/15 dark:text-hurricane-200',
	],
	{
		variants: {
			click: {
				false: null,
				true: 'cursor-pointer',
			},
			error: {
				false: 'border-storm-100 dark:border-white/15',
				true: 'border-negative-red-500 dark:border-negative-red-alternative',
			},
		},
	}
);

@Component({
	tag: 'p-attachment',
	styleUrl: 'attachment.component.css',
	shadow: true,
})
export class Attachment {
	/**
	 * Wether to enable the camera button on mobile
	 */
	@Prop() enableCameraOnMobile = false;

	/**
	 * The value of the attachment (usually the file name)
	 */
	@Prop() value: string;

	/**
	 * The fileID to use to track the file
	 */
	@Prop() fileId: string;

	/**
	 * The type of files to accept
	 */
	@Prop() accept: string[] | string = null;

	/**
	 * The label of the attachment
	 */
	@Prop() label: string | HTMLSlotElement;

	/**
	 * The helper of the attachment
	 */
	@Prop() helper: string | HTMLSlotElement;

	/**
	 * Wether the attachment is required
	 */
	@Prop({ reflect: true }) required = true;

	/**
	 * The variant of the attachment
	 */
	@Prop() mode: 'read' | 'write' = 'read';

	/**
	 * The placeholder of the attachment
	 */
	@Prop() placeholder: string = 'Upload a file...';

	/**
	 * The text for the camera tooltip
	 */
	@Prop() cameraTooltip: string = 'Camera';

	/**
	 * The text for the download tooltip
	 */
	@Prop() downloadTooltip: string = 'Download';

	/**
	 * The text for the upload tooltip
	 */
	@Prop() uploadTooltip: string = 'Upload';

	/**
	 * The text for the delete tooltip
	 */
	@Prop() deleteTooltip: string = 'Delete';

	/**
	 * Wether the attachment is loading
	 */
	@Prop() loading = false;

	/**
	 * The error to show
	 */
	@Prop() error: string;

	/**
	 * Event when upload is pressed
	 */
	@Event({
		bubbles: false,
	})
	upload: EventEmitter<{
		file: File;
		fileId: string;
		result: string;
	}>;

	/**
	 * Event when download is pressed
	 */
	@Event({
		bubbles: false,
	})
	download: EventEmitter<void>;

	/**
	 * Event when delete is pressed
	 */
	@Event({
		bubbles: false,
	})
	delete: EventEmitter<void>;

	private _fileRef: HTMLInputElement;
	private _cameraFileRef: HTMLInputElement;

	render() {
		let prefix = (
			<p-icon
				class='text-storm-300'
				variant='attachment'
			/>
		);

		if (this.error) {
			prefix = (
				<p-icon
					class='text-negative-red-500'
					variant='warning'
				/>
			);
		}

		// const isMobileDevice = isMobile();
		const isMobileDevice = isTablet();

		const baseText =
			'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm';
		return (
			<Fragment>
				<p-field-container
					error={this.error}
					forceShowTooltip={!!this.error?.length}
					helper={this.helper}
					label={this.label}
					required={this.required}
					variant='write'
				>
					<div
						class='flex w-full items-start gap-2'
						slot='content'
					>
						<div
							class={attachment({
								click: this.mode === 'write' && !this.value?.length,
								error: !!this.error?.length,
							})}
							onClick={() => this._uploadClick()}
						>
							{prefix}

							<span class={cn(baseText, 'peer empty:hidden dark:text-white')}>
								{this.value}
							</span>
							<span class={cn(baseText, 'hidden peer-empty:block')}>
								{this.placeholder}
							</span>
						</div>

						<p-tooltip
							class='w-8'
							content={
								this.mode === 'read'
									? this.downloadTooltip
									: this.value?.length
										? this.deleteTooltip
										: this.uploadTooltip
							}
						>
							<p-button
								disabled={this.loading}
								icon={
									this.mode === 'read'
										? 'download'
										: this.value?.length
											? 'trash'
											: 'upload'
								}
								iconOnly={true}
								loading={this.loading}
								slot='trigger'
								variant='secondary'
								onOnClick={() =>
									this.mode === 'write' && !this.value?.length
										? this._uploadClick()
										: (this.mode === 'read'
												? this.download
												: this.delete
											).emit()
								}
							/>
						</p-tooltip>

						{this.enableCameraOnMobile &&
							this.mode === 'write' &&
							isMobileDevice &&
							!this.value?.length && (
								<p-tooltip
									class='w-8 desktop-xs:hidden'
									content={this.cameraTooltip}
								>
									<p-button
										icon='camera'
										iconOnly={true}
										slot='trigger'
										variant='secondary'
										onOnClick={() => this._cameraClick()}
									/>
								</p-tooltip>
							)}
					</div>
				</p-field-container>

				<input
					accept={
						Array.isArray(this.accept) ? this.accept?.join(',') : this.accept
					}
					class='hidden'
					ref={el => (this._fileRef = el)}
					type='file'
					onChange={ev => this._onFileChange(ev)}
				/>

				<input
					accept='image/*'
					capture='true'
					class='hidden'
					ref={el => (this._cameraFileRef = el)}
					type='file'
					onChange={ev => this._onFileChange(ev)}
				/>
			</Fragment>
		);
	}

	private _uploadClick() {
		if (!this._fileRef || this.mode !== 'write' || this.value?.length) {
			return;
		}

		this._fileRef.click();
	}

	private _cameraClick() {
		if (!this.enableCameraOnMobile || isMobile()) {
			return;
		}

		if (!this._cameraFileRef || this.mode !== 'write') {
			return;
		}

		this._cameraFileRef?.click();
	}

	private _onFileChange(ev: Event) {
		const target = ev.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			this.loading = true;

			const reader = new FileReader();
			reader.addEventListener('load', (e: any) =>
				this._onLoad(file, e?.currentTarget?.result)
			);
			reader.readAsDataURL(file);
		}
	}

	private _onLoad(file: File, result: string) {
		this.upload.emit({
			fileId: this.fileId,
			result,
			file,
		});

		if (this._fileRef) {
			this._fileRef.value = '';
		}

		if (this._cameraFileRef) {
			this._cameraFileRef.value = '';
		}

		this.loading = false;
	}
}
