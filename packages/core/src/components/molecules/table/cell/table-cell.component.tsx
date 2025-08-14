import { Component, h, Host, Prop } from '@stencil/core';
import {
	TableDefinitionData,
	TableDefinitionTemplateFunc,
} from '../../../../types';
import { getTableCellColumnClasses, objectGetByPath } from '../../../../utils';

import { cn } from '../../../../utils/cn';
import { TableColumn } from '../../../helpers/table/column/table-column.component';

/*
     With this, we shall hack the system in ways no one would ever have thought.

	 <div class="justify-start justify-center justify-end"></div>
     <div class="font-semibold text-storm-500 text-storm-500 text-storm-400 text-storm-300"></div>
     <div class="w-[calc(1/12*100%-0.5rem)] w-[calc(2/12*100%-0.5rem)] w-[calc(3/12*100%-0.5rem)] w-[calc(4/12*100%-0.5rem)] w-[calc(5/12*100%-0.5rem)] w-[calc(6/12*100%-0.5rem)] w-[calc(7/12*100%-0.5rem)] w-[calc(8/12*100%-0.5rem)] w-[calc(9/12*100%-0.5rem)] w-[calc(10/12*100%-0.5rem)] w-[calc(11/12*100%-0.5rem)] w-12/12"></div>
     <div class="tablet:w-[calc(1/12*100%-0.5rem)] tablet:w-[calc(2/12*100%-0.5rem)] tablet:w-[calc(3/12*100%-0.5rem)] tablet:w-[calc(4/12*100%-0.5rem)] tablet:w-[calc(5/12*100%-0.5rem)] tablet:w-[calc(6/12*100%-0.5rem)] tablet:w-[calc(7/12*100%-0.5rem)] tablet:w-[calc(8/12*100%-0.5rem)] tablet:w-[calc(9/12*100%-0.5rem)] tablet:w-[calc(10/12*100%-0.5rem)] tablet:w-[calc(11/12*100%-0.5rem)] tablet:w-12/12"></div>
     <div class="desktop-xs:w-[calc(1/12*100%-0.5rem)] desktop-xs:w-[calc(2/12*100%-0.5rem)] desktop-xs:w-[calc(3/12*100%-0.5rem)] desktop-xs:w-[calc(4/12*100%-0.5rem)] desktop-xs:w-[calc(5/12*100%-0.5rem)] desktop-xs:w-[calc(6/12*100%-0.5rem)] desktop-xs:w-[calc(7/12*100%-0.5rem)] desktop-xs:w-[calc(8/12*100%-0.5rem)] desktop-xs:w-[calc(9/12*100%-0.5rem)] desktop-xs:w-[calc(10/12*100%-0.5rem)] desktop-xs:w-[calc(11/12*100%-0.5rem)] desktop-xs:w-[calc(12/12*100%-0.5rem)]"></div>
     <div class="desktop-xs:w-[calc(1/12*100%-0.5rem)] desktop-xs:w-[calc(2/12*100%-0.5rem)] desktop-xs:w-[calc(3/12*100%-0.5rem)] desktop-xs:w-[calc(4/12*100%-0.5rem)] desktop-xs:w-[calc(5/12*100%-0.5rem)] desktop-xs:w-[calc(6/12*100%-0.5rem)] desktop-xs:w-[calc(7/12*100%-0.5rem)] desktop-xs:w-[calc(8/12*100%-0.5rem)] desktop-xs:w-[calc(9/12*100%-0.5rem)] desktop-xs:w-[calc(10/12*100%-0.5rem)] desktop-xs:w-[calc(11/12*100%-0.5rem)] desktop-xs:w-[calc(12/12*100%-0.5rem)]"></div>
     <div class="desktop-sm:w-[calc(1/12*100%-0.5rem)] desktop-sm:w-[calc(2/12*100%-0.5rem)] desktop-sm:w-[calc(3/12*100%-0.5rem)] desktop-sm:w-[calc(4/12*100%-0.5rem)] desktop-sm:w-[calc(5/12*100%-0.5rem)] desktop-sm:w-[calc(6/12*100%-0.5rem)] desktop-sm:w-[calc(7/12*100%-0.5rem)] desktop-sm:w-[calc(8/12*100%-0.5rem)] desktop-sm:w-[calc(9/12*100%-0.5rem)] desktop-sm:w-[calc(10/12*100%-0.5rem)] desktop-sm:w-[calc(11/12*100%-0.5rem)] desktop-sm:w-[calc(12/12*100%-0.5rem)]"></div>
     <div class="desktop:w-[calc(1/12*100%-0.5rem)] desktop:w-[calc(2/12*100%-0.5rem)] desktop:w-[calc(3/12*100%-0.5rem)] desktop:w-[calc(4/12*100%-0.5rem)] desktop:w-[calc(5/12*100%-0.5rem)] desktop:w-[calc(6/12*100%-0.5rem)] desktop:w-[calc(7/12*100%-0.5rem)] desktop:w-[calc(8/12*100%-0.5rem)] desktop:w-[calc(9/12*100%-0.5rem)] desktop:w-[calc(10/12*100%-0.5rem)] desktop:w-[calc(11/12*100%-0.5rem)] desktop:w-[calc(12/12*100%-0.5rem)]"></div>
     <div class="desktop-lg:w-[calc(1/12*100%-0.5rem)] desktop-lg:w-[calc(2/12*100%-0.5rem)] desktop-lg:w-[calc(3/12*100%-0.5rem)] desktop-lg:w-[calc(4/12*100%-0.5rem)] desktop-lg:w-[calc(5/12*100%-0.5rem)] desktop-lg:w-[calc(6/12*100%-0.5rem)] desktop-lg:w-[calc(7/12*100%-0.5rem)] desktop-lg:w-[calc(8/12*100%-0.5rem)] desktop-lg:w-[calc(9/12*100%-0.5rem)] desktop-lg:w-[calc(10/12*100%-0.5rem)] desktop-lg:w-[calc(11/12*100%-0.5rem)] desktop-lg:w-[calc(12/12*100%-0.5rem)]"></div>
     <div class="desktop-xl:w-[calc(1/12*100%-0.5rem)] desktop-xl:w-[calc(2/12*100%-0.5rem)] desktop-xl:w-[calc(3/12*100%-0.5rem)] desktop-xl:w-[calc(4/12*100%-0.5rem)] desktop-xl:w-[calc(5/12*100%-0.5rem)] desktop-xl:w-[calc(6/12*100%-0.5rem)] desktop-xl:w-[calc(7/12*100%-0.5rem)] desktop-xl:w-[calc(8/12*100%-0.5rem)] desktop-xl:w-[calc(9/12*100%-0.5rem)] desktop-xl:w-[calc(10/12*100%-0.5rem)] desktop-xl:w-[calc(11/12*100%-0.5rem)] desktop-xl:w-[calc(12/12*100%-0.5rem)]"></div>
     <div class="hidden flex group-hover:hidden group-hover:flex"></div>
     <div class="tablet:hidden tablet:flex tablet:group-hover:hidden tablet:group-hover:flex"></div>
     <div class="desktop-xs:hidden desktop-xs:flex desktop-xs:group-hover:hidden desktop-xs:group-hover:flex"></div>
     <div class="desktop-sm:hidden desktop-sm:flex  desktop-sm:group-hover:hidden desktop-sm:group-hover:flex"></div>
     <div class="desktop:hidden desktop:flex desktop:group-hover:hidden desktop:group-hover:flex"></div>
     <div class="desktop-lg:hidden desktop-lg:flex desktop-lg:group-hover:hidden desktop-lg:group-hover:flex"></div>
     <div class="desktop-xl:hidden desktop-xl:flex desktop-xl:group-hover:hidden desktop-xl:group-hover:flex"></div>
     <div class="pr-4 pr-0"></div>
     <div class="tablet:pr-4 tablet:pr-0"></div>
     <div class="desktop-xs:pr-4 desktop-xs:pr-0"></div>
     <div class="desktop-sm:pr-4 desktop-sm:pr-0"></div>
     <div class="desktop:pr-4 desktop:pr-0"></div>
     <div class="desktop-lg:pr-4 desktop-lg:pr-0"></div>
     <div class="desktop-xl:pr-4 desktop-xl:pr-0"></div>


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
			<Host class={this._getColumnClasses()}>
				{this.checkbox}

				{this._getContent()}
			</Host>
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
		return getTableCellColumnClasses(this.definition, this.variant);
	}
}
