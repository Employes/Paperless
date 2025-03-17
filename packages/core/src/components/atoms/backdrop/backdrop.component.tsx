import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

const backdrop = cva(
	[
		'flex',
		'fixed left-0 top-0 z-backdrop',
		'h-full w-full',
		'overflow-hidden',
		'bg-black-teal-800/40',
		'max-h-screen max-w-screen',
	],
	{
		variants: {
			blur: {
				false: null,
				true: 'backdrop-blur-sm',
			},
			closing: {
				false: 'animate-fade-in',
				true: 'animate-fade-out pointer-events-none',
			},
		},
	}
);

const contentContainer = cva(
	[
		'h-full w-full overflow-y-auto overflow-x-hidden',
		'pt-16 tablet:px-16 desktop-xs:p-16',
		'flex items-end justify-center desktop-xs:items-stretch',
		'max-h-screen max-w-screen',
	],
	{
		variants: {
			variant: {
				modal: null,
				drawer: [
					'items-start justify-end desktop-xs:items-start',
					'p-0 tablet:p-0 desktop-xs:p-0',
				],
			},
			closing: {
				false: null,
				true: 'overflow-hidden',
			},
		},
	}
);

@Component({
	tag: 'p-backdrop',
	styleUrl: 'backdrop.component.css',
})
export class Backdrop {
	/**
	 * The variant of the backdrop
	 */
	@Prop() variant: 'modal' | 'drawer' = 'modal';

	/**
	 * Wether to apply blur on the background of the backdrop
	 */
	@Prop() applyBlur: boolean = false;

	/**
	 * Wether the backdrop is closing
	 */
	@Prop() closing: boolean = false;

	/**
	 * Wether we should scroll lock the body
	 */
	@Prop() scrollLock: boolean = true;

	/**
	 * The class passed to the component
	 */
	@Prop() class: string;

	/**
	 * When the backdrop is clicked
	 */
	@Event({
		bubbles: false,
	})
	clicked: EventEmitter<MouseEvent>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	componentWillLoad() {
		if (this.scrollLock) {
			document.querySelector(':root').classList.add('scroll-lock');
		}
	}

	disconnectedCallback() {
		if (this.scrollLock) {
			document.querySelector(':root').classList.remove('scroll-lock');
		}
	}

	componentWillUpdate() {
		if (!this.scrollLock) {
			document.querySelector(':root').classList.remove('scroll-lock');
		}

		if (this.scrollLock) {
			document.querySelector(':root').classList.add('scroll-lock');
		}
	}

	render() {
		return (
			<Host class={backdrop({ blur: this.applyBlur, closing: this.closing })}>
				<div
					class={contentContainer({
						variant: this.variant,
						closing: this.closing,
					})}
				>
					<slot />
				</div>
			</Host>
		);
	}

	@Listen('click', { capture: true })
	handleClick(ev: MouseEvent) {
		if (ev.target !== this._el && !this._el.contains(ev.target as Node)) {
			return;
		}

		this.clicked.emit(ev);
	}
}
