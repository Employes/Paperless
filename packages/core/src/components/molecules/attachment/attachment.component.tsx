import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-attachment',
	styleUrl: 'attachment.component.scss',
	shadow: true,
})
export class Attachment {
	/**
	 * The variant of the button
	 */
	@Prop() mode: 'read' | 'write' = 'read';

	/**
	 * Wether the attachment is uploading/loading
	 */
	@Prop() loading = false;

	/**
	 * The error to show
	 */
	@Prop() error: string;

	/**
	 * Event when download is pressed
	 */
	@Event({
		bubbles: false,
	})
	download: EventEmitter<any>;

	/**
	 * Wether the attachment is downloading
	 */
	@Prop() downloading = false;

	/**
	 * Event when delete is pressed
	 */
	@Event({
		bubbles: false,
	})
	delete: EventEmitter<any>;

	render() {
		let prefix = <p-icon variant="attachment" />;

		if (this.loading) {
			prefix = <p-loader />;
		}

		if (this.error) {
			prefix = <p-icon variant="warning" class="text-negative" />;
		}

		return (
			<Host class="p-attachment flex items-start gap-4">
				<div
					class={`flex h-8 min-w-0 flex-1 items-center justify-start gap-2 rounded-lg bg-mystic px-2 ${
						this.error?.length
							? 'text-negative'
							: 'text-storm-medium'
					}`}
				>
					{prefix}

					<span class="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
						<slot />
					</span>

					{this.error?.length && <p-input-error error={this.error} />}
				</div>

				<p-button
					variant="secondary"
					iconOnly={true}
					icon={this.mode === 'read' ? 'download' : 'trash'}
					disabled={this.loading}
					loading={this.mode === 'read' && this.downloading}
					size="small"
					onOnClick={() =>
						(this.mode === 'read'
							? this.download
							: this.delete
						).emit()
					}
				/>
			</Host>
		);
	}
}
