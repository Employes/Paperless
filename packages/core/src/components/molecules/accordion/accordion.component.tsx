import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

import { ThemedHost } from '../../../internal/themed-host.component';
import { IconVariant } from '../../../types';
import { cn } from '../../../utils';
import { LabelVariant } from '../label/label.component';

@Component({
	tag: 'p-accordion',
	styleUrl: 'accordion.component.css',
	shadow: true,
})
export class Accordion {
	/**
	 * The variant of the accordion
	 */
	@Prop() variant: 'primary' | 'secondary' = 'primary';

	/**
	 * Header of the accordion
	 */
	@Prop() header!: string;

	/**
	 * Wether the accordion is open
	 */
	@Prop() open: boolean = false;

	/**
	 * Wether the accordion can be closed
	 */
	@Prop() closeable: boolean = true;

	/**
	 * Wether the accordion can be opened
	 */
	@Prop() openable: boolean = true;

	/**
	 * Label of the accordion
	 */
	@Prop() label: string;

	/**
	 * Variant of the label
	 */
	@Prop() labelVariant: LabelVariant = 'neutral';

	/**
	 * Icon of the accordion
	 */
	@Prop() labelIcon: IconVariant;

	/**
	 * Open change event
	 */
	@Event({
		bubbles: false,
	})
	isOpen: EventEmitter<boolean>;

	render() {
		return (
			<ThemedHost>
				<div class='flex w-full flex-col'>
					<div
						class={cn('flex cursor-pointer items-center gap-2', {
							'text-storm-500 dark:text-white': this.variant === 'primary',
							'text-storm-300 dark:text-hurricane-200':
								this.variant === 'secondary',
						})}
						onClick={() => this._onClick()}
					>
						<p-icon
							class='flex shrink-0'
							rotate={this.open ? 0 : -90}
							variant='caret'
						/>
						<p class='my-0 shrink-0 whitespace-nowrap text-base font-medium'>
							{this.header}
						</p>
						{this.label && (
							<p-label
								icon={this.labelIcon}
								variant={this.labelVariant}
							>
								{this.label}
							</p-label>
						)}
						<p-divider class='flex-1' />
					</div>
					{this.open && (
						<div class='mt-4'>
							<slot />
						</div>
					)}
				</div>
			</ThemedHost>
		);
	}

	private _onClick() {
		if (!this.closeable && this.open) {
			return;
		}

		if (!this.openable && !this.open) {
			return;
		}

		this.open = !this.open;
		this.isOpen.emit(this.open);
	}
}
