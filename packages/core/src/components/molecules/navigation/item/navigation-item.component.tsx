import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { ThemedHost } from '../../../../internal/themed-host.component';
import { asBoolean } from '../../../../utils/as-boolean';
import { cn } from '../../../../utils/cn';
import { IconVariant } from '../../../atoms/icon/icon.component';

const navigationItem = cva(
	[
		'h-8 w-[inherit]',
		'flex items-center gap-2',
		'hover:text-storm-500 dark:hover:text-white',
		'rounded-lg',
		'py-1 px-2',
		'text-sm font-medium',
		'cursor-pointer',
	],
	{
		variants: {
			active: {
				false: [
					'text-storm-400 dark:text-hurricane-200',
					'hover:bg-off-white-500 dark:hover:bg-white/10',
				],
				true: [
					'bg-off-white-600 dark:bg-white/10 text-storm-500 dark:text-white font-semibold',
				],
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
				true: ['bg-indigo-500 text-storm-500'],
			},
		},
	}
);

@Component({
	tag: 'p-navigation-item',
	styleUrl: './navigation-item.component.css',
	scoped: true,
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
			<ThemedHost class={cn('p-navigation-item inline-block', this.class)}>
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
			</ThemedHost>
		);
	}
}
