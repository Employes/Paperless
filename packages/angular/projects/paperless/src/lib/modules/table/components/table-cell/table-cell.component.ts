/* eslint-disable max-len */
import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import {
	getTableCellColumnClasses,
	objectGetByPath,
	TableDefinitionData,
} from '@paperless/core';

/*
     With this, we shall hack the system in ways no one would ever have thought.

	 justify-start justify-center justify-end items-center gap-4
     font-semibold text-storm-500 text-storm-500 text-storm-400 text-storm-300
     w-[calc(1/12*100%-0.5rem)] w-[calc(2/12*100%-0.5rem)] w-[calc(3/12*100%-0.5rem)] w-[calc(4/12*100%-0.5rem)] w-[calc(5/12*100%-0.5rem)] w-[calc(6/12*100%-0.5rem)] w-[calc(7/12*100%-0.5rem)] w-[calc(8/12*100%-0.5rem)] w-[calc(9/12*100%-0.5rem)] w-[calc(10/12*100%-0.5rem)] w-[calc(11/12*100%-0.5rem)] w-12/12
     tablet:w-[calc(1/12*100%-0.5rem)] tablet:w-[calc(2/12*100%-0.5rem)] tablet:w-[calc(3/12*100%-0.5rem)] tablet:w-[calc(4/12*100%-0.5rem)] tablet:w-[calc(5/12*100%-0.5rem)] tablet:w-[calc(6/12*100%-0.5rem)] tablet:w-[calc(7/12*100%-0.5rem)] tablet:w-[calc(8/12*100%-0.5rem)] tablet:w-[calc(9/12*100%-0.5rem)] tablet:w-[calc(10/12*100%-0.5rem)] tablet:w-[calc(11/12*100%-0.5rem)] tablet:w-12/12
     desktop-xs:w-[calc(1/12*100%-0.5rem)] desktop-xs:w-[calc(2/12*100%-0.5rem)] desktop-xs:w-[calc(3/12*100%-0.5rem)] desktop-xs:w-[calc(4/12*100%-0.5rem)] desktop-xs:w-[calc(5/12*100%-0.5rem)] desktop-xs:w-[calc(6/12*100%-0.5rem)] desktop-xs:w-[calc(7/12*100%-0.5rem)] desktop-xs:w-[calc(8/12*100%-0.5rem)] desktop-xs:w-[calc(9/12*100%-0.5rem)] desktop-xs:w-[calc(10/12*100%-0.5rem)] desktop-xs:w-[calc(11/12*100%-0.5rem)] desktop-xs:w-[calc(12/12*100%-0.5rem)]
     desktop-xs:w-[calc(1/12*100%-0.5rem)] desktop-xs:w-[calc(2/12*100%-0.5rem)] desktop-xs:w-[calc(3/12*100%-0.5rem)] desktop-xs:w-[calc(4/12*100%-0.5rem)] desktop-xs:w-[calc(5/12*100%-0.5rem)] desktop-xs:w-[calc(6/12*100%-0.5rem)] desktop-xs:w-[calc(7/12*100%-0.5rem)] desktop-xs:w-[calc(8/12*100%-0.5rem)] desktop-xs:w-[calc(9/12*100%-0.5rem)] desktop-xs:w-[calc(10/12*100%-0.5rem)] desktop-xs:w-[calc(11/12*100%-0.5rem)] desktop-xs:w-[calc(12/12*100%-0.5rem)]
     desktop-sm:w-[calc(1/12*100%-0.5rem)] desktop-sm:w-[calc(2/12*100%-0.5rem)] desktop-sm:w-[calc(3/12*100%-0.5rem)] desktop-sm:w-[calc(4/12*100%-0.5rem)] desktop-sm:w-[calc(5/12*100%-0.5rem)] desktop-sm:w-[calc(6/12*100%-0.5rem)] desktop-sm:w-[calc(7/12*100%-0.5rem)] desktop-sm:w-[calc(8/12*100%-0.5rem)] desktop-sm:w-[calc(9/12*100%-0.5rem)] desktop-sm:w-[calc(10/12*100%-0.5rem)] desktop-sm:w-[calc(11/12*100%-0.5rem)] desktop-sm:w-[calc(12/12*100%-0.5rem)]
     desktop:w-[calc(1/12*100%-0.5rem)] desktop:w-[calc(2/12*100%-0.5rem)] desktop:w-[calc(3/12*100%-0.5rem)] desktop:w-[calc(4/12*100%-0.5rem)] desktop:w-[calc(5/12*100%-0.5rem)] desktop:w-[calc(6/12*100%-0.5rem)] desktop:w-[calc(7/12*100%-0.5rem)] desktop:w-[calc(8/12*100%-0.5rem)] desktop:w-[calc(9/12*100%-0.5rem)] desktop:w-[calc(10/12*100%-0.5rem)] desktop:w-[calc(11/12*100%-0.5rem)] desktop:w-[calc(12/12*100%-0.5rem)]
     desktop-lg:w-[calc(1/12*100%-0.5rem)] desktop-lg:w-[calc(2/12*100%-0.5rem)] desktop-lg:w-[calc(3/12*100%-0.5rem)] desktop-lg:w-[calc(4/12*100%-0.5rem)] desktop-lg:w-[calc(5/12*100%-0.5rem)] desktop-lg:w-[calc(6/12*100%-0.5rem)] desktop-lg:w-[calc(7/12*100%-0.5rem)] desktop-lg:w-[calc(8/12*100%-0.5rem)] desktop-lg:w-[calc(9/12*100%-0.5rem)] desktop-lg:w-[calc(10/12*100%-0.5rem)] desktop-lg:w-[calc(11/12*100%-0.5rem)] desktop-lg:w-[calc(12/12*100%-0.5rem)]
     desktop-xl:w-[calc(1/12*100%-0.5rem)] desktop-xl:w-[calc(2/12*100%-0.5rem)] desktop-xl:w-[calc(3/12*100%-0.5rem)] desktop-xl:w-[calc(4/12*100%-0.5rem)] desktop-xl:w-[calc(5/12*100%-0.5rem)] desktop-xl:w-[calc(6/12*100%-0.5rem)] desktop-xl:w-[calc(7/12*100%-0.5rem)] desktop-xl:w-[calc(8/12*100%-0.5rem)] desktop-xl:w-[calc(9/12*100%-0.5rem)] desktop-xl:w-[calc(10/12*100%-0.5rem)] desktop-xl:w-[calc(11/12*100%-0.5rem)] desktop-xl:w-[calc(12/12*100%-0.5rem)]
     hidden flex group-hover:hidden group-hover:flex flex-shrink-0
     tablet:hidden tablet:flex tablet:group-hover:hidden tablet:group-hover:flex
     desktop-xs:hidden desktop-xs:flex desktop-xs:group-hover:hidden desktop-xs:group-hover:flex
     desktop-sm:hidden desktop-sm:flex  desktop-sm:group-hover:hidden desktop-sm:group-hover:flex
     desktop:hidden desktop:flex desktop:group-hover:hidden desktop:group-hover:flex
     desktop-lg:hidden desktop-lg:flex desktop-lg:group-hover:hidden desktop-lg:group-hover:flex
     desktop-xl:hidden desktop-xl:flex desktop-xl:group-hover:hidden desktop-xl:group-hover:flex
     pr-4 pr-0
     tablet:pr-4 tablet:pr-0
     desktop-xs:pr-4 desktop-xs:pr-0
     desktop-sm:pr-4 desktop-sm:pr-0
     desktop:pr-4 desktop:pr-0
     desktop-lg:pr-4 desktop-lg:pr-0
     desktop-xl:pr-4 desktop-xl:pr-0


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
	selector: 'p-table-cell-ngx',
	templateUrl: './table-cell.component.html',
})
export class TableCell {
	/**
	 * The variant of the column
	 */
	@Input() variant: 'default' | 'loading' | 'header' = 'default';

	/**
	 * The index of the column
	 */
	@Input() index: number = 0;

	/**
	 * The index of the row
	 */
	@Input() rowIndex: number = 0;

	/**
	 * The definition of the table column
	 */
	@Input() definition?: any; // TableDefinition

	/**
	 * The item in question
	 */
	@Input() item: any;

	/**
	 * The value of the column
	 */
	@Input() value: any;

	/**
	 * The checkbox templateRef
	 */
	@Input() checkbox: TemplateRef<any> | undefined;

	/**
	 * The template ref for the content
	 */
	@Input() template: TemplateRef<any> | undefined;

	@HostBinding('class')
	get class() {
		return getTableCellColumnClasses(this.definition, this.variant);
	}

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
}
