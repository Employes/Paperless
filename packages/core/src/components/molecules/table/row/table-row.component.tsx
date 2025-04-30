import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const row = cva(['flex w-full flex-col', 'group', 'px-4', 'relative z-[1]'], {
	variants: {
		variant: {
			default: ['text-sm text-black-teal-500'],
			header: ['text-xs font-normal text-black-teal-400'],
		},
		enableHover: {
			true: [
				'after:bg-off-white-300 after:opacity-0 after:transition-opacity',
				'after:w-[calc(100%-0.5rem)] after:h-[calc(100%-0.5rem)]',
				'after:absolute after:top-1 after:left-1 after:z-[0]',
				'after:pointer-events-none',
				'after:rounded-lg',
			],
			false: null,
		},
	},
	compoundVariants: [
		{
			variant: 'default',
			enableHover: true,
			class: ['hover:cursor-pointer hover:after:opacity-100'],
		},
	],
});

const content = cva(
	'relative flex  w-full flex-nowrap items-center justify-between z-[1]',
	{
		variants: {
			variant: {
				default: 'min-h-[3.875rem] py-2 tablet:h-18 tablet:py-6',
				header: 'min-h-0 pb-4',
			},
		},
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
	@Prop() variant: 'default' | 'header' = 'default';

	/**
	 * Enable hover
	 */
	@Prop() enableHover: boolean = true;

	render() {
		return (
			<div class='flex flex-col'>
				<div
					class={row({
						variant: this.variant,
						enableHover: this.enableHover,
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
				<p-divider />
			</div>
		);
	}
}
