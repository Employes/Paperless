import {
	Component,
	Element,
	h,
	Prop,
	Event,
	EventEmitter,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { ThemedHost } from '../../../internal/themed-host.component';

const infopanel = cva(
	['flex flex-col gap-1', 'w-full h-inherit px-4 py-3', 'rounded-lg relative'],
	{
		variants: {
			closeAble: {
				true: 'pr-10',
			},
			variant: {
				neutral: 'bg-indigo-100 dark:bg-indigo-300/15',
				positive: 'bg-positive-green-100 dark:bg-positive-green-alternative/15',
				biased: 'bg-amber-50 dark:bg-amber-alternative/15',
				negative: 'bg-negative-red-100 dark:bg-negative-red-alternative/15',
				feedback: 'bg-white-700 dark:bg-hurricane-100/15',
			},
		},
	}
);

const header = cva('text-sm font-medium', {
	variants: {
		variant: {
			neutral: 'text-indigo-900 dark:text-indigo-400',
			positive: 'text-positive-green-800 dark:text-positive-green-alternative',
			biased: 'text-amber-800 dark:text-amber-alternative',
			negative: 'text-negative-red-800 dark:text-negative-red-alternative',
			feedback: 'text-storm-800 dark:text-hurricane-100',
		},
	},
});

const close = cva([
	'absolute right-2 top-2',
	'flex items-center justify-center',

	'rounded-lg cursor-pointer',
	'text-storm-800/60 hover:text-storm-800/60 hover:bg-white-500/40',
	'dark:text-white/60 dark:hover:text-white dark:hover:bg-white/15',

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
			<ThemedHost>
				<div
					class={infopanel({
						variant: this.variant,
						closeAble: this.closeable,
					})}
				>
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
						<div class='h-inherit text-sm font-normal text-storm-800/60 dark:text-white/70'>
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
			</ThemedHost>
		);
	}

	private _close() {
		this.closed.emit();
		this._el.remove();
	}
}
