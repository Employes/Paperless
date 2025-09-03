import { Component, Fragment, h, Prop } from '@stencil/core';
import {
	TableDefinitionData,
	TableDefinitionTemplateFunc,
} from '../../../../types';
import { getTableCellColumnClasses, objectGetByPath } from '../../../../utils';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { cn } from '../../../../utils/cn';
import { TableColumn } from '../../../helpers/table/column/table-column.component';

/*
     With this, we shall hack the system in ways no one would ever have thought.


        ⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⠿⣷⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⣷⠿⣿⣿⣶⣦⣀⠀⠀⠀⠀⠀
        ⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣶⣦⣬⡉⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠚⢉⣥⣴⣾⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀
        ⠀⠀⠀⡾⠿⠛⠛⠛⠛⠿⢿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⠿⠿⠛⠛⠛⠛⠿⢧⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⣠⣤⠶⠶⠶⠰⠦⣤⣀⠀⠙⣷⠀⠀⠀⠀⠀⠀⠀⢠⡿⠋⢀⣀⣤⢴⠆⠲⠶⠶⣤⣄⠀⠀⠀⠀⠀⠀⠀
        ⠀⠘⣆⠀⠀⢠⣾⣫⣶⣾⣿⣿⣿⣿⣷⣯⣿⣦⠈⠃⡇⠀⠀⠀⠀⢸⠘⢁⣶⣿⣵⣾⣿⣿⣿⣿⣷⣦⣝⣷⡄⠀⠀⡰⠂⠀
        ⠀⠀⣨⣷⣶⣿⣧⣛⣛⠿⠿⣿⢿⣿⣿⣛⣿⡿⠀⠀⡇⠀⠀⠀⠀⢸⠀⠈⢿⣟⣛⠿⢿⡿⢿⢿⢿⣛⣫⣼⡿⣶⣾⣅⡀⠀
        ⢀⡼⠋⠁⠀⠀⠈⠉⠛⠛⠻⠟⠸⠛⠋⠉⠁⠀⠀⢸⡇⠀⠀⠄⠀⢸⡄⠀⠀⠈⠉⠙⠛⠃⠻⠛⠛⠛⠉⠁⠀⠀⠈⠙⢧⡀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇⢠⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡇⠀⠀⠀⠀⢸⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⠁⣿⠇⠀⠀⠀⠀⢸⡇⠙⢿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠰⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⠖⡾⠁⠀⠀⣿⠀⠀⠀⠀⠀⠘⣿⠀⠀⠙⡇⢸⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠄⠀
        ⠀⠀⢻⣷⡦⣤⣤⣤⡴⠶⠿⠛⠉⠁⠀⢳⠀⢠⡀⢿⣀⠀⠀⠀⠀⣠⡟⢀⣀⢠⠇⠀⠈⠙⠛⠷⠶⢦⣤⣤⣤⢴⣾⡏⠀⠀
        ⠀⠀⠈⣿⣧⠙⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⢊⣙⠛⠒⠒⢛⣋⡚⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⡿⠁⣾⡿⠀⠀⠀
        ⠀⠀⠀⠘⣿⣇⠈⢿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⡿⢿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⡟⠁⣼⡿⠁⠀⠀⠀
        ⠀⠀⠀⠀⠘⣿⣦⠀⠻⣿⣷⣦⣤⣤⣶⣶⣶⣿⣿⣿⣿⠏⠀⠀⠻⣿⣿⣿⣿⣶⣶⣶⣦⣤⣴⣿⣿⠏⢀⣼⡿⠁⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠘⢿⣷⣄⠙⠻⠿⠿⠿⠿⠿⢿⣿⣿⣿⣁⣀⣀⣀⣀⣙⣿⣿⣿⠿⠿⠿⠿⠿⠿⠟⠁⣠⣿⡿⠁⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠈⠻⣯⠙⢦⣀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⣠⠴⢋⣾⠟⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⡀⠈⠉⠒⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠐⠒⠉⠁⢀⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⣠⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⡀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    */
@Component({
	tag: 'p-table-cell',
	styleUrl: 'table-cell.component.css',
})
export class TableCell {
	/**
	 * The variant of the column
	 */
	@Prop() variant: 'default' | 'loading' | 'header' = 'default';

	/**
	 * The index of the column
	 */
	@Prop() index: number;

	/**
	 * The index of the row
	 */
	@Prop() rowIndex: number;

	/**
	 * The definition of the table column
	 */
	@Prop() definition?: TableColumn | any;

	/**
	 * The item in question
	 */
	@Prop() item: any;

	/**
	 * The value of the column
	 */
	@Prop() value: any;

	/**
	 * The checkbox to show
	 */
	@Prop() checkbox: any;

	/**
	 * The template to show
	 */
	@Prop() template: TableDefinitionTemplateFunc = ({
		value,
	}: TableDefinitionData) => value;

	get data(): TableDefinitionData | { value: string } {
		if (this.variant === 'header') {
			return {
				value: this.value,
			};
		}

		return {
			value:
				this.value ?? this.definition?.path
					? objectGetByPath(this.item, this.definition.path)
					: null,
			item: this.item,
			index: this.index,
			rowIndex: this.rowIndex,
		};
	}

	render() {
		return (
			<ThemedHost class={this._getColumnClasses()}>
				{this.checkbox}

				{this._getContent()}

				{false && (
					<Fragment>
						<div class='text-storm-300 text-storm-400 text-storm-500 dark:text-hurricane-200 dark:text-white'></div>
						<div class='justify-start justify-end justify-center'></div>
						<div class='font-semibold text-storm-300 text-storm-400 text-storm-500'></div>
						<div class='w-12/12 w-1/12 w-10/12 w-11/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12'></div>
						<div class='tablet:w-12/12 tablet:w-1/12 tablet:w-10/12 tablet:w-11/12 tablet:w-2/12 tablet:w-3/12 tablet:w-4/12 tablet:w-5/12 tablet:w-6/12 tablet:w-7/12 tablet:w-8/12 tablet:w-9/12'></div>
						<div class='desktop-xs:w-12/12 desktop-xs:w-1/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12'></div>
						<div class='desktop-xs:w-12/12 desktop-xs:w-1/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12'></div>
						<div class='desktop-sm:w-12/12 desktop-sm:w-1/12 desktop-sm:w-10/12 desktop-sm:w-11/12 desktop-sm:w-2/12 desktop-sm:w-3/12 desktop-sm:w-4/12 desktop-sm:w-5/12 desktop-sm:w-6/12 desktop-sm:w-7/12 desktop-sm:w-8/12 desktop-sm:w-9/12'></div>
						<div class='desktop:w-12/12 desktop:w-1/12 desktop:w-10/12 desktop:w-11/12 desktop:w-2/12 desktop:w-3/12 desktop:w-4/12 desktop:w-5/12 desktop:w-6/12 desktop:w-7/12 desktop:w-8/12 desktop:w-9/12'></div>
						<div class='desktop-lg:w-12/12 desktop-lg:w-1/12 desktop-lg:w-10/12 desktop-lg:w-11/12 desktop-lg:w-2/12 desktop-lg:w-3/12 desktop-lg:w-4/12 desktop-lg:w-5/12 desktop-lg:w-6/12 desktop-lg:w-7/12 desktop-lg:w-8/12 desktop-lg:w-9/12'></div>
						<div class='desktop-xl:w-12/12 desktop-xl:w-1/12 desktop-xl:w-10/12 desktop-xl:w-11/12 desktop-xl:w-2/12 desktop-xl:w-3/12 desktop-xl:w-4/12 desktop-xl:w-5/12 desktop-xl:w-6/12 desktop-xl:w-7/12 desktop-xl:w-8/12 desktop-xl:w-9/12'></div>
						<div class='flex hidden group-hover:flex group-hover:hidden'></div>
						<div class='tablet:flex tablet:hidden tablet:group-hover:flex tablet:group-hover:hidden'></div>
						<div class='desktop-xs:flex desktop-xs:hidden desktop-xs:group-hover:flex desktop-xs:group-hover:hidden'></div>
						<div class='desktop-sm:flex desktop-sm:hidden  desktop-sm:group-hover:flex desktop-sm:group-hover:hidden'></div>
						<div class='desktop:flex desktop:hidden desktop:group-hover:flex desktop:group-hover:hidden'></div>
						<div class='desktop-lg:flex desktop-lg:hidden desktop-lg:group-hover:flex desktop-lg:group-hover:hidden'></div>
						<div class='desktop-xl:flex desktop-xl:hidden desktop-xl:group-hover:flex desktop-xl:group-hover:hidden'></div>
						<div class='pr-0 pr-4'></div>
						<div class='tablet:pr-0 tablet:pr-4'></div>
						<div class='desktop-xs:pr-0 desktop-xs:pr-4'></div>
						<div class='desktop-sm:pr-0 desktop-sm:pr-4'></div>
						<div class='desktop:pr-0 desktop:pr-4'></div>
						<div class='desktop-lg:pr-0 desktop-lg:pr-4'></div>
						<div class='desktop-xl:pr-0 desktop-xl:pr-4'></div>
					</Fragment>
				)}
			</ThemedHost>
		);
	}

	private _getContent() {
		if (this.variant === 'loading') {
			return (
				<p-loader
					variant='ghost'
					class='h-6 w-full flex-1 rounded'
				/>
			);
		}

		return (
			<div
				class={cn('overflow-hidden text-ellipsis', {
					'text-start':
						this.definition.align === 'start' ||
						this.definition.align === undefined,
					'text-center': this.definition.align === 'center',
					'text-end': this.definition.align === 'end',
				})}
			>
				{this.variant === 'header' ? (
					this.data.value
				) : this.definition.useSlot ? (
					<slot />
				) : (
					this.template(this.data as TableDefinitionData)
				)}
			</div>
		);
	}

	private _getColumnClasses() {
		return cn(getTableCellColumnClasses(this.definition, this.variant));
	}
}
