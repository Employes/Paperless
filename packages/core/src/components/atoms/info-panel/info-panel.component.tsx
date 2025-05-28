import {
	Component,
	Element,
	h,
	Prop,
	Event,
	EventEmitter,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

const infopanel = cva(
	['flex flex-col gap-1', 'w-full h-inherit px-4 py-3', 'rounded-lg relative'],
	{
		variants: {
			variant: {
				neutral: 'bg-supportive-lilac-200',
				positive: 'bg-positive-green-100',
				biased: 'bg-amber-50',
				negative: 'bg-negative-red-100',
				feedback: 'bg-white-700',
			},
		},
	}
);

const header = cva('text-sm font-medium', {
	variants: {
		variant: {
			neutral: 'text-supportive-lilac-900',
			positive: 'text-positive-green-800',
			biased: 'text-amber-800',
			negative: 'text-negative-red-800',
			feedback: 'text-black-teal-800',
		},
	},
});

const close = cva([
	'absolute right-2 top-2',
	'flex items-center justify-center',

	'rounded-lg cursor-pointer',
	'text-black-teal-800/60 hover:text-black-teal-800/60 hover:bg-white-500/40',

	'h-6 w-6',
]);

@Component({
	tag: 'p-info-panel',
	styleUrl: 'info-panel.component.css',
	shadow: true,
})
export class InfoPanel {
	/**
	 * The variant of the info panel
	 */
	@Prop() variant: 'neutral' | 'positive' | 'biased' | 'negative' | 'feedback' =
		'feedback';

	/**
	 * The header of the info panel
	 */
	@Prop() header: string;

	/**
	 * The content of the info panel
	 */
	@Prop() content: string;

	/**
	 * Wether the panel can be closed
	 */
	@Prop() closeable: boolean = false;

	/**
	 * When the backdrop is clicked
	 */
	@Event({
		bubbles: false,
	})
	closed: EventEmitter<void>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		const hasHeaderSlot = !!this._el.querySelector(':scope > [slot="header"]');
		const hasContentSlot = !!this._el.querySelector(
			':scope > [slot="content"]'
		);

		return (
			<div class={infopanel({ variant: this.variant })}>
				{(this.header?.length || hasHeaderSlot) && (
					<div class={header({ variant: this.variant })}>
						{this.header?.length ? (
							<p class='my-0'>{this.header}</p>
						) : (
							<slot name='header' />
						)}
					</div>
				)}

				{(this.content?.length || hasContentSlot) && (
					<div class='h-inherit text-sm text-black-teal-800/60'>
						{this.content?.length ? (
							<p class='my-0'>{this.content}</p>
						) : (
							<slot name='content' />
						)}
					</div>
				)}

				{this.closeable && (
					<div
						class={close()}
						onClick={() => this._close()}
					>
						<p-icon variant='negative' />
					</div>
				)}
			</div>
		);
	}

	private _close() {
		this.closed.emit();
		this._el.remove();
	}
}
