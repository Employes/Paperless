import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { IconVariant } from '../../../atoms/icon/icon.component';
import { cn } from '../../../../utils/cn';
import { asBoolean } from '../../../../utils/as-boolean';

const navigationItem = cva(
	[
		'h-8 w-[inherit]',
		'flex items-center gap-2',
		'hover:text-storm-500',
		'rounded-lg',
		'py-1 px-2',
		'text-sm font-medium',
		'cursor-pointer',
	],
	{
		variants: {
			active: {
				false: ['text-storm-400', 'hover:bg-off-white'],
				true: ['bg-off-white-600 text-storm font-semibold'],
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
				true: ['bg-indigo'],
			},
		},
	}
);

@Component({
	tag: 'p-navigation-item',
	styleUrl: './navigation-item.component.css',
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
	 * Wether the navigation item is loading
	 */
	@Prop() loading: boolean = false;

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
	 * The class of the container passed by parent
	 */
	@Prop() class: string;

	render() {
		const TagType = this.as;

		const active = asBoolean(this.active) || this.class?.includes('active');

		return (
			<Host class={cn('p-navigation-item inline-block', this.class)}>
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

					{!!this.loading && <p-loader class='ml-auto' />}
				</TagType>
			</Host>
		);
	}
}
