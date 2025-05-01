import {
	Component,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import { RotateOptions } from '../../../types/tailwind';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';
import { asBoolean } from '../../../utils/as-boolean';
import { cn } from '../../../utils/cn';

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
				secondary: null,
				text: null,
				transparent: 'bg-transparent border-transparent',
				dropdown: null,
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
				variant: ['secondary', 'dropdown'],
				class: ['bg-white border-black-teal/10'],
			},
			{
				variant: ['primary', 'secondary', 'dropdown'],
				disabled: false,
				class: 'border',
			},
			{
				variant: ['primary', 'secondary', 'dropdown'],
				disabled: false,
				loading: false,
				class: 'active:border-supportive-lilac-800 active:ring active:ring-2',
			},
			{
				variant: ['primary', 'secondary', 'dropdown'],
				disabled: false,
				loading: false,
				active: true,
				class: 'border-supportive-lilac-800 ring ring-2',
			},
			{
				variant: ['primary', 'secondary', 'transparent', 'dropdown'],
				buttonGroupPosition: 'none',
				class: 'rounded-lg',
			},
			{
				variant: ['primary', 'secondary', 'transparent', 'dropdown'],
				buttonGroupPosition: 'start',
				class: 'rounded-s-lg',
			},
			{
				variant: ['primary', 'secondary', 'transparent', 'dropdown'],
				buttonGroupPosition: 'end',
				class: 'rounded-e-lg',
			},
			{
				variant: ['primary', 'secondary', 'dropdown'],
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
				variant: ['secondary', 'dropdown'],
				disabled: true,
				class: 'border bg-white-600 text-black-teal-100',
			},
			{
				variant: ['secondary', 'dropdown'],
				disabled: false,
				loading: false,
				class:
					'drop-shadow-1 hover:drop-shadow-1 hover:bg-white-600 active:text-black-teal/60 active:ring-supportive-lilac-100',
			},
			{
				variant: ['secondary', 'dropdown'],
				disabled: false,
				loading: false,
				active: true,
				class: 'ring-supportive-lilac-100',
			},

			{
				variant: 'text',
				disabled: false,
				class: 'text-dark-teal-400 hover:text-dark-teal-500',
			},
			{
				variant: 'text',
				disabled: true,
				class: 'text-dark-teal-100',
			},
			{
				variant: 'text',
				underline: true,
				disabled: false,
				class: 'border-b border-dark-teal-400 hover:border-dark-teal-500',
			},
			{
				variant: 'text',
				underline: true,
				disabled: true,
				class: 'border-b border-dark-teal-100',
			},
			{
				variant: 'text',
				disabled: false,
				loading: false,
				class: 'active:text-dark-teal-600 active:border-dark-teal-600',
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
				variant: 'dropdown',
				iconOnly: false,
				class: 'p-2',
			},

			{
				variant: ['primary', 'secondary', 'transparent', 'text'],
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
			sm: 'text-xs',
			base: 'text-base',
			lg: 'text-base',
		},
		variant: {
			primary: null,
			secondary: null,
			text: null,
			transparent: null,
			dropdown: null,
		},
		disabled: {
			true: null,
			false: null,
		},
		active: {
			true: null,
			false: null,
		},
	},
	compoundVariants: [
		{
			variant: ['secondary', 'dropdown'],
			disabled: false,
			active: false,
			class: 'text-black-teal-300 group-hover:text-black-teal',
		},
		{
			variant: 'transparent',
			disabled: false,
			active: false,
			class: 'text-dark-teal-200 group-hover:text-dark-teal-100',
		},
	],
});

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'transparent'
	| 'text'
	| 'dropdown';

@Component({
	tag: 'p-button',
	styleUrl: 'button.component.css',
})
export class Button {
	/**
	 * The label of the button (Can use slot)
	 */
	@Prop() label?: string;

	/**
	 * The type of the button
	 */
	@Prop() as?: 'a' | 'button' = 'button';

	/**
	 * The variant of the button
	 */
	@Prop() variant?: ButtonVariant = 'primary';

	/**
	 * Wether to force an active state
	 */
	@Prop() active?: boolean = false;

	/**
	 * Wether the text variant has underline
	 */
	@Prop() underline?: boolean = true;

	/**
	 * Href in case of "text" version
	 */
	@Prop() href?: string;

	/**
	 * Target in case of "text" version
	 */
	@Prop() target?: string;

	/**
	 * The size of the button
	 */
	@Prop() size?: 'sm' | 'base' | 'lg' = 'base';

	/**
	 * The type of the button
	 */
	@Prop() type?: 'button' | 'submit' = 'button';

	/**
	 * Wether to show a loader or not
	 */
	@Prop() loading?: boolean = false;

	/**
	 * Wether to show a chevron or not
	 */
	@Prop() chevron?: boolean | 'up' | 'down' = false;

	/**
	 * Chevron position
	 */
	@Prop() chevronPosition?: 'start' | 'end' = 'end';

	/**
	 * Wether the button is disabled
	 */
	@Prop() disabled?: boolean = false;

	/**
	 * Icon to show on the button
	 */
	@Prop() icon?: IconVariant;

	/**
	 * Wether the button is icon only
	 */
	@Prop() iconOnly?: boolean = false;

	/**
	 * Icon position
	 */
	@Prop() iconPosition?: 'start' | 'end' = 'start';

	/**
	 * Icon flip
	 */
	@Prop() iconFlip?: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate?: RotateOptions;

	/**
	 * Wether the button should inherit text styles
	 */
	@Prop() inheritText?: boolean = false;

	/**
	 * Position of the button in the button group, mostly un-used if not in a group
	 */
	@Prop() buttonGroupPosition?: 'start' | 'center' | 'end' | 'none' = 'none';

	/**
	 * The class of the container passed by parent
	 */
	@Prop() class?: string;

	/**
	 * Button click event
	 */
	@Event({
		bubbles: false,
	})
	onClick: EventEmitter<MouseEvent>;

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

		const hostClass = cn('p-button inline-block', this.class);
		const active = asBoolean(this.active) || hostClass?.includes('active');

		return (
			<Host class={hostClass}>
				<VariableTag
					disabled={this.disabled}
					href={this.href}
					type={this.variant !== 'text' ? this.type : undefined}
					target={this.target}
					class={button({
						variant: this.variant,
						size: this.size,
						underline: asBoolean(this.underline, true),
						loading: asBoolean(this.loading),
						disabled: asBoolean(this.disabled),
						buttonGroupPosition: this.buttonGroupPosition,
						iconOnly: asBoolean(this.iconOnly),
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

					{this.label ? this.label : <slot />}

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
					variant: this.variant,
					disabled: asBoolean(this.disabled),
					active: asBoolean(this.active),
				})}
				variant={this.icon}
				flip={this.iconFlip}
				rotate={this.iconRotate}
			/>
		);
	}
}
