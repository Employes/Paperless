import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cn } from '../../../utils';
import { cva } from 'class-variance-authority';

const attachment = cva(
	[
		'flex flex-1 items-center justify-start gap-2',
		'h-8 min-w-0 px-2 rounded-lg',
		'border border-solid bg-white-600',
	],
	{
		variants: {
			error: {
				false: 'bg-white-600 border-black-teal-100 text-black-teal-200',
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
	 * The value of the attachment (usually the file name)
	 */
	@Prop() value: string;

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
	upload: EventEmitter<void>;

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

	render() {
		let prefix = (
			<p-icon
				class='text-black-teal-300'
				variant='attachment'
			/>
		);

		if (this.loading) {
			prefix = <p-loader />;
		}

		if (this.error) {
			prefix = (
				<p-icon
					variant='warning'
					class='text-negative-red'
				/>
			);
		}

		const baseText =
			'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap  text-sm';
		return (
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
							error: !!this.error?.length,
						})}
					>
						{prefix}

						<span class={cn(baseText, 'peer empty:hidden')}>{this.value}</span>
						<span class={cn(baseText, 'hidden peer-empty:block')}>
							{this.placeholder}
						</span>
					</div>

					<p-tooltip
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
								(this.mode === 'read'
									? this.download
									: this.value?.length
									? this.delete
									: this.upload
								).emit()
							}
						/>
					</p-tooltip>
				</div>
			</p-field-container>
		);
	}
}
