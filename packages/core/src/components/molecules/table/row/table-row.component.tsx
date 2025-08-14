import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';

const row = cva(
	['flex min-w-[calc(100%-0.5rem)] flex-col', 'group', 'relative'],
	{
		variants: {
			variant: {
				default: ['px-3 m-1', 'text-sm text-storm-500'],
				header: ['px-4', 'text-xs font-normal text-storm-400'],
				secondary: [
					'px-4',
					'bg-off-white-300 rounded-lg',
					'font-ambit text-lg font-bold',
				],
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
				class: [
					'rounded-lg transition-colors',
					'hover:cursor-pointer hover:bg-off-white-300',
				],
			},
			{
				variant: 'default',
				checked: true,
				class: ['rounded-lg transition-colors', 'bg-off-white-300'],
			},
		],
	}
);

const content = cva(
	'relative flex min-w-full flex-nowrap items-center justify-between gap-4',
	{
		variants: {
			variant: {
				default: null,
				secondary: null,
				header: 'min-h-0 pb-4',
			},
		},
		compoundVariants: [
			{
				variant: ['default', 'secondary'],
				class: 'min-h-14 py-2 tablet:py-4',
			},
		],
	}
);

const actions = cva([
	'absolute -right-4 top-1 z-[2]',
	'h-[calc(100%-0.5rem)]',
	'opacity-0 transition-opacity group-hover:opacity-100',
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
	@Prop() variant: 'default' | 'secondary' | 'header' = 'default';

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
		);
	}
}
