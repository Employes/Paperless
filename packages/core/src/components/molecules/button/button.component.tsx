import {
	Component,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
	Element,
} from '@stencil/core';
import { RotateOptions } from '../../../types/tailwind';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';
import { cva } from 'class-variance-authority';

const button = cva(
	[
		'group',
		'font-semibold leading-4',
		'flex items-center justify-center gap-2',
		'cursor-pointer',
	],
	{
		variants: {
			variant: {
				primary: ['bg-supportive-lilac border-black-teal/20'],
				secondary: ['bg-white border-black-teal/10'],
				text: ['text-teal'],
				transparent: ['bg-transparent'],
			},
			active: {
				true: null,
				false: null,
			},
			loading: {
				true: 'cursor-wait',
				false: null,
			},
			size: {
				sm: ['text-xs h-6'],
				base: ['text-sm h-8'],
				lg: ['text-base h-10'],
			},
			disabled: {
				true: 'cursor-not-allowed',
				false: null,
			},
			underline: {
				true: null,
				false: null,
			},
			buttonGroupPosition: {
				none: null,
				start: null,
				center: null,
				end: null,
			},
			iconOnly: {
				true: 'justify-center',
				false: 'w-inherit py-1',
			},
		},
		compoundVariants: [
			// variants
			{
				variant: ['primary', 'secondary'],
				disabled: false,
				class: 'border',
			},
			{
				variant: ['primary', 'secondary'],
				disabled: false,
				loading: false,
				class: 'active:border-supportive-lilac-800 active:ring active:ring-2',
			},
			{
				variant: ['primary', 'secondary'],
				disabled: false,
				loading: false,
				active: true,
				class: 'border-supportive-lilac-800 ring ring-2',
			},
			{
				variant: ['primary', 'secondary', 'transparent'],
				buttonGroupPosition: 'none',
				class: 'rounded-lg',
			},
			{
				variant: ['primary', 'secondary', 'transparent'],
				buttonGroupPosition: 'start',
				class: 'rounded-s-lg',
			},
			{
				variant: ['primary', 'secondary', 'transparent'],
				buttonGroupPosition: 'end',
				class: 'rounded-e-lg',
			},
			{
				variant: ['primary', 'secondary'],
				disabled: false,
				class: 'text-black-teal',
			},
			{
				variant: 'primary',
				disabled: true,
				class: 'bg-supportive-lilac-100 text-black-teal-100',
			},
			{
				variant: 'primary',
				disabled: false,
				loading: false,
				class:
					'drop-shadow-supportive-lilac hover:drop-shadow-2 hover:bg-supportive-lilac-700 active:text-black-teal/60 active:ring-black-teal/10',
			},
			{
				variant: 'primary',
				disabled: false,
				loading: false,
				active: true,
				class: 'ring-black-teal/10',
			},
			{
				variant: 'secondary',
				disabled: true,
				class: 'border bg-white-600 text-black-teal-100',
			},
			{
				variant: 'secondary',
				disabled: false,
				loading: false,
				class:
					'drop-shadow-1 hover:drop-shadow-1 hover:bg-white-600 active:text-black-teal/60 active:ring-supportive-lilac-100',
			},
			{
				variant: 'secondary',
				disabled: false,
				loading: false,
				active: true,
				class: 'ring-supportive-lilac-100',
			},

			{
				variant: 'text',
				underline: true,
				disabled: false,
				class: 'border-b border-teal',
			},
			{
				variant: 'text',
				underline: true,
				disabled: true,
				class: 'border-b border-teal-100',
			},
			{
				variant: 'text',
				disabled: true,
				class: 'text-teal-100',
			},
			{
				variant: 'text',
				disabled: false,
				loading: false,
				class: 'active:text-teal-800',
			},

			{
				variant: 'transparent',
				disabled: false,
				class: 'text-dark-teal-100',
			},
			{
				variant: 'transparent',
				disabled: false,
				loading: false,
				class: 'hover:bg-dark-teal active:text-dark-teal-100/60',
			},
			{
				variant: 'transparent',
				disabled: true,
				class: 'text-dark-teal-100/60',
			},

			{
				variant: ['primary', 'secondary', 'transparent'],
				size: ['base', 'sm'],
				iconOnly: false,
				class: 'px-2',
			},
			{
				variant: ['primary', 'secondary', 'transparent'],
				size: 'lg',
				iconOnly: false,
				class: 'px-3',
			},

			{
				iconOnly: false,
				class: 'py-1',
			},

			{
				size: 'sm',
				iconOnly: true,
				class: 'w-6',
			},
			{
				size: 'base',
				iconOnly: true,
				class: 'w-8',
			},
			{
				size: 'lg',
				iconOnly: true,
				class: 'w-10',
			},
		],
	}
);

const icon = cva([], {
	variants: {
		size: {
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-base',
		},
	},
});

@Component({
	tag: 'p-button',
	styleUrl: 'button.component.scss',
})
export class Button {
	/**
	 * The type of the button
	 */
	@Prop() as: 'a' | 'button' = 'button';

	/**
	 * The variant of the button
	 */
	@Prop() variant: 'primary' | 'secondary' | 'transparent' | 'text' = 'primary';

	/**
	 * Wether to force an active state
	 */
	@Prop() active: boolean = false;

	/**
	 * Wether the text variant has underline
	 */
	@Prop() underline: boolean = true;

	/**
	 * Href in case of "text" version
	 */
	@Prop() href: string;

	/**
	 * Target in case of "text" version
	 */
	@Prop() target: string;

	/**
	 * The size of the button
	 */
	@Prop() size: 'sm' | 'base' | 'lg' = 'base';

	/**
	 * The type of the button
	 */
	@Prop() type: 'button' | 'submit' = 'button';

	/**
	 * Wether to show a loader or not
	 */
	@Prop() loading: boolean = false;

	/**
	 * Wether to show a chevron or not
	 */
	@Prop() chevron: boolean | 'up' | 'down' = false;

	/**
	 * Chevron position
	 */
	@Prop() chevronPosition: 'start' | 'end' = 'end';

	/**
	 * Wether the button is disabled
	 */
	@Prop() disabled: boolean = false;

	/**
	 * Icon to show on the button
	 */
	@Prop() icon: IconVariant;

	/**
	 * Wether the button is icon only
	 */
	@Prop() iconOnly: boolean = false;

	/**
	 * Icon position
	 */
	@Prop() iconPosition: 'start' | 'end' = 'end';

	/**
	 * Icon flip
	 */
	@Prop() iconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate: RotateOptions;

	/**
	 * Wether the button should inherit text styles
	 */
	@Prop() inheritText: boolean = false;

	/**
	 * Position of the button in the button group, mostly un-used if not in a group
	 */
	@Prop() buttonGroupPosition: 'start' | 'center' | 'end' | 'none' = 'none';

	/**
	 * Button click event
	 */
	@Event({
		bubbles: false,
	})
	onClick: EventEmitter<MouseEvent>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		let loaderColor: 'white' | 'storm' | 'indigo' = 'white';
		switch (this.variant) {
			case 'secondary':
				loaderColor = 'storm';
				break;
			case 'text':
				loaderColor = 'indigo';
				break;
		}

		const VariableTag =
			this.variant === 'text' || this.href?.length || this.as === 'a'
				? 'a'
				: 'button';

		const active = this.active || this._el.classList.contains('active');

		return (
			<Host class='p-button block'>
				<VariableTag
					disabled={this.disabled}
					href={this.href}
					type={this.variant !== 'text' ? this.type : undefined}
					target={this.target}
					class={button({
						variant: this.variant,
						size: this.size,
						underline: this.underline,
						loading: this.loading,
						disabled: this.disabled,
						buttonGroupPosition: this.buttonGroupPosition,
						iconOnly: this.iconOnly,
						active,
					})}
				>
					{this.chevron && this.chevronPosition === 'start' && (
						<p-icon
							variant='caret'
							rotate={this.chevron === 'up' ? 180 : 0}
						/>
					)}

					{this.icon &&
						this.iconPosition === 'start' &&
						!(this.iconOnly && this.loading) &&
						this._getIcon()}

					<slot />

					{this.icon &&
						this.iconPosition === 'end' &&
						!this.loading &&
						!this.chevron &&
						this._getIcon()}

					{this.chevron && !this.loading && this.chevronPosition === 'end' && (
						<p-icon
							variant='caret'
							rotate={this.chevron === 'up' ? 180 : 0}
						/>
					)}

					{this.loading && <p-loader color={loaderColor} />}
				</VariableTag>
			</Host>
		);
	}

	@Listen('click', { capture: true })
	handleClick(ev: MouseEvent) {
		if (this.loading || this.disabled) {
			ev.preventDefault();
			return;
		}

		this.onClick.emit(ev);
	}

	private _getIcon() {
		if (!this.icon) {
			return;
		}

		return (
			<p-icon
				class={icon({
					size: this.size,
				})}
				variant={this.icon}
				flip={this.iconFlip}
				rotate={this.iconRotate}
			/>
		);
	}
}
