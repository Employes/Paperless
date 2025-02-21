import { Component, h, Host, Prop, Element } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { IconVariant } from '../../atoms/icon/icon.component';

const navigationItem = cva(
	[
		'h-8 w-[inherit]',
		'flex items-center gap-2',
		'text-black-teal-400 hover:text-black-teal-500',
		'rounded-lg',
		'py-1 px-2',
		'text-sm font-medium',
		'cursor-pointer',
	],
	{
		variants: {
			active: {
				false: ['hover:bg-off-white'],
				true: ['bg-off-white-600 text-black-teal-500 font-semibold'],
			},
			icon: {
				false: false,
				true: ['pl-1'],
			},
		},
	}
);

const navigationItemIconContainer = cva(
	['flex h-6 aspect-branding items-center justify-center rounded-full'],
	{
		variants: {
			active: {
				false: false,
				true: ['bg-supportive-lilac'],
			},
		},
	}
);

@Component({
	tag: 'p-navigation-item',
	styleUrl: './navigation-item.component.scss',
	shadow: false,
})
export class NavigationItem {
	/**
	 * Icon of the navigation item
	 */
	@Prop() icon!: IconVariant;

	/**
	 * Wether the navigation item is active
	 */
	@Prop() active: boolean = false;

	/**
	 * The element to use for the navigation item
	 */
	@Prop() as: string = 'a';

	/**
	 * Icon of the navigation item
	 */
	@Prop() counter: number | string;

	/**
	 * The href of the navigation item
	 */
	@Prop() href: string;

	/**
	 * The target of the navigation item
	 */
	@Prop() target: string;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		const TagType = this.as;

		const active = this.active || this._el.classList.contains('active');

		return (
			<Host class='p-navigation-item inline-block'>
				<TagType
					class={navigationItem({
						icon: !!this.icon,
						active,
					})}
					href={this.href}
					target={this.target}
				>
					<div class={navigationItemIconContainer({ active })}>
						<p-icon variant={this.icon} />
					</div>

					<span class={this.counter && 'has-counter'}>
						<slot />
					</span>

					{!!this.counter && this.counter !== '0' && (
						<p-badge>{this.counter}</p-badge>
					)}
				</TagType>
			</Host>
		);
	}
}
