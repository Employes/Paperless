import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Listen,
	Prop,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../utils/as-boolean';

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
		'flex',
		'max-h-screen max-w-screen',
	],
	{
		variants: {
			variant: {
				modal: [
					'pt-16 tablet:px-16 desktop-xs:py-8',
					'items-end desktop-xs:items-stretch justify-center',
				],
				drawer: ['items-start justify-end desktop-xs:items-start py-safe'],
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
	shadow: true,
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
			<div
				class={backdrop({
					blur: asBoolean(this.applyBlur),
					closing: asBoolean(this.closing),
				})}
			>
				<div
					class={contentContainer({
						variant: this.variant,
						closing: asBoolean(this.closing),
					})}
				>
					<slot />
				</div>
			</div>
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
