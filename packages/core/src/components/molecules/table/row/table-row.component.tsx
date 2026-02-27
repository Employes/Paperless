import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { asBoolean } from '../../../../utils/as-boolean';

const row = cva(
	['flex min-w-[calc(100%-0.5rem)] flex-col', 'group', 'relative'],
	{
		variants: {
			variant: {
				default: ['m-1 px-3', 'text-sm text-storm-500', 'dark:text-white'],
				header: null,
				'header-secondary': 'mb-4',
				secondary: ['px-4', 'font-ambit text-lg font-bold'],
			},
			enableHover: {
				true: null,
				false: null,
			},
			checked: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{
				variant: 'default',
				enableHover: true,
				class: ['rounded-lg transition-colors', 'hover:cursor-pointer'],
			},
			{
				variant: 'default',
				enableHover: true,
				checked: false,
				class: ['hover:bg-off-white-300', 'dark:hover:bg-hurricane-600'],
			},
			{
				variant: 'default',
				checked: true,
				class: [
					'rounded-lg transition-colors',
					`
						bg-off-white-300
						dark:bg-hurricane-400
						dark:hover:bg-hurricane-400
					`,
				],
			},
			{
				variant: ['secondary', 'header-secondary'],
				class: ['rounded-lg bg-off-white-300', 'dark:bg-hurricane-400'],
			},
			{
				variant: ['header', 'header-secondary'],
				class: [
					'px-4',
					'text-xs font-normal text-storm-400',
					'dark:text-hurricane-200',
				],
			},
		],
	}
);

const content = cva(
	'relative flex min-w-full flex-nowrap items-stretch justify-between',
	{
		variants: {
			variant: {
				default: null,
				secondary: null,
				header: 'pb-4',
				'header-secondary': 'py-2',
			},
		},
		compoundVariants: [
			{
				variant: ['default', 'secondary'],
				class: `
					min-h-14 py-2
					tablet:py-4
				`,
			},
			{
				variant: ['header', 'header-secondary'],
				class: 'min-h-0',
			},
		],
	}
);

const actions = cva([
	'absolute -right-4 top-1 z-[2]',
	'h-[calc(100%-0.5rem)]',
	`
		opacity-0 transition-opacity
		group-hover:opacity-100
	`,
	'empty:hidden',
]);

@Component({
	tag: 'p-table-row',
	styleUrl: 'table-row.component.css',
	shadow: true,
})
export class TableRow {
	/**
	 * Variant of the header
	 */
	@Prop() variant: 'default' | 'secondary' | 'header' | 'header-secondary' =
		'default';

	/**
	 * Enable hover
	 */
	@Prop() enableHover: boolean = true;

	/**
	 * Wether the row is checked
	 */
	@Prop() checked: boolean = false;

	/**
	 * Wether the row is the last one
	 */
	@Prop() isLast: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div class='flex flex-col'>
					<div
						class={row({
							variant: this.variant,
							enableHover: this.enableHover,
							checked: this.checked,
						})}
					>
						<div
							class={content({
								variant: this.variant,
							})}
						>
							<slot />
							<div class={actions()}>
								<slot name='actions' />
							</div>
						</div>
					</div>
					{!asBoolean(this.isLast) && this.variant !== 'secondary' && (
						<p-divider />
					)}
				</div>
			</ThemedHost>
		);
	}
}
