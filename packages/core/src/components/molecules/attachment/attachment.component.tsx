import {
	Component,
	Event,
	EventEmitter,
	Fragment,
	h,
	Prop,
} from '@stencil/core';
import { cn, isMobile, isTablet } from '../../../utils';
import { cva } from 'class-variance-authority';

const attachment = cva(
	[
		'flex flex-1 items-center justify-start gap-2',
		'h-8 min-w-0 px-2 rounded-lg',
		'border border-solid bg-white-600',
	],
	{
		variants: {
			click: {
				false: null,
				true: 'cursor-pointer',
			},
			error: {
				false: 'bg-white-600 border-storm-100 text-storm-200',
				true: 'border-negative-red',
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
					variant='warning'
					class='text-negative-red'
				/>
			);
		}

		// const isMobileDevice = isMobile();
		const isMobileDevice = isTablet();

		const baseText =
			'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap  text-sm';
		return (
			<Fragment>
				<p-field-container
					variant='write'
					label={this.label}
					helper={this.helper}
					error={this.error}
					required={this.required}
					forceShowTooltip={!!this.error?.length}
				>
					<div
						slot='content'
						class='flex w-full items-start gap-2'
					>
						<div
							class={attachment({
								click: this.mode === 'write' && !this.value?.length,
								error: !!this.error?.length,
							})}
							onClick={() => this._uploadClick()}
						>
							{prefix}

							<span class={cn(baseText, 'peer empty:hidden')}>
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
								slot='trigger'
								variant='secondary'
								iconOnly={true}
								icon={
									this.mode === 'read'
										? 'download'
										: this.value?.length
										? 'trash'
										: 'upload'
								}
								disabled={this.loading}
								loading={this.loading}
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
									content={this.cameraTooltip}
									class='w-8 desktop-xs:hidden'
								>
									<p-button
										slot='trigger'
										variant='secondary'
										iconOnly={true}
										icon='camera'
										onOnClick={() => this._cameraClick()}
									/>
								</p-tooltip>
							)}
					</div>
				</p-field-container>

				<input
					class='hidden'
					type='file'
					accept={
						Array.isArray(this.accept) ? this.accept?.join(',') : this.accept
					}
					ref={el => (this._fileRef = el)}
					onChange={ev => this._onFileChange(ev)}
				/>

				<input
					class='hidden'
					type='file'
					accept='image/*'
					capture='true'
					ref={el => (this._cameraFileRef = el)}
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
			reader.onload = (e: any) => this._onLoad(file, e?.currentTarget?.result);
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
