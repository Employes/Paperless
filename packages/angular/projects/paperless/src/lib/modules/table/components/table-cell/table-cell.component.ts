/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, Input, TemplateRef } from '@angular/core';

import {
	cn,
	getTableCellColumnClasses,
	objectGetByPath,
} from '@paperless/core';

import { PLoader } from '../../../../stencil/components';

/*
     With this, we shall hack the system in ways no one would ever have thought.

     bg-white sticky dark:bg-hurricane-700 z-[2] flex-shrink-0 flex-shrink from-80% pl-8
	 text-storm-400 text-storm-300 text-storm-500 dark:text-white dark:text-hurricane-200
	 justify-start justify-center justify-end items-center gap-4
     font-semibold text-storm-500 text-storm-500 text-storm-400 text-storm-300
     w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12 w-10/12 w-11/12 w-12/12
     tablet:w-1/12 tablet:w-2/12 tablet:w-3/12 tablet:w-4/12 tablet:w-5/12 tablet:w-6/12 tablet:w-7/12 tablet:w-8/12 tablet:w-9/12 tablet:w-10/12 tablet:w-11/12 tablet:w-12/12
     desktop-xs:w-1/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-12/12
     desktop-xs:w-1/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-12/12
     desktop-sm:w-1/12 desktop-sm:w-2/12 desktop-sm:w-3/12 desktop-sm:w-4/12 desktop-sm:w-5/12 desktop-sm:w-6/12 desktop-sm:w-7/12 desktop-sm:w-8/12 desktop-sm:w-9/12 desktop-sm:w-10/12 desktop-sm:w-11/12 desktop-sm:w-12/12
     desktop:w-1/12 desktop:w-2/12 desktop:w-3/12 desktop:w-4/12 desktop:w-5/12 desktop:w-6/12 desktop:w-7/12 desktop:w-8/12 desktop:w-9/12 desktop:w-10/12 desktop:w-11/12 desktop:w-12/12
     desktop-lg:w-1/12 desktop-lg:w-2/12 desktop-lg:w-3/12 desktop-lg:w-4/12 desktop-lg:w-5/12 desktop-lg:w-6/12 desktop-lg:w-7/12 desktop-lg:w-8/12 desktop-lg:w-9/12 desktop-lg:w-10/12 desktop-lg:w-11/12 desktop-lg:w-12/12
     desktop-xl:w-1/12 desktop-xl:w-2/12 desktop-xl:w-3/12 desktop-xl:w-4/12 desktop-xl:w-5/12 desktop-xl:w-6/12 desktop-xl:w-7/12 desktop-xl:w-8/12 desktop-xl:w-9/12 desktop-xl:w-10/12 desktop-xl:w-11/12 desktop-xl:w-12/12
     hidden flex group-hover:hidden group-hover:flex
     tablet:hidden tablet:flex tablet:group-hover:hidden tablet:group-hover:flex
     desktop-xs:hidden desktop-xs:flex desktop-xs:group-hover:hidden desktop-xs:group-hover:flex
     desktop-sm:hidden desktop-sm:flex  desktop-sm:group-hover:hidden desktop-sm:group-hover:flex
     desktop:hidden desktop:flex desktop:group-hover:hidden desktop:group-hover:flex
     desktop-lg:hidden desktop-lg:flex desktop-lg:group-hover:hidden desktop-lg:group-hover:flex
     desktop-xl:hidden desktop-xl:flex desktop-xl:group-hover:hidden desktop-xl:group-hover:flex
     pr-4 pr-0 last-of-type:pr-0
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
	imports: [NgTemplateOutlet, PLoader],
})
export class TableCellComponent {
	/**
	 * The variant of the column
	 */
	@Input() variant:
		| 'default'
		| 'loading'
		| 'header'
		| 'header-secondary'
		| 'actions' = 'default';

	/**
	 * The index of the column
	 */
	@Input() index = 0;

	/**
	 * The index of the row
	 */
	@Input() rowIndex = 0;

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
	 * Wether the cell needs checkbox offset instead of a checkbox
	 */
	@Input() checkboxOffset = false;

	/**
	 * The template ref for the content
	 */
	@Input() template: TemplateRef<any> | undefined;

	/**
	 * Wether the table is scrollable
	 */
	@Input() scrollable = false;

	public cn = cn;

	@HostBinding('class')
	get hostClass() {
		return cn(
			getTableCellColumnClasses(
				this.definition,
				this.variant,
				this.checkboxOffset
			),
			{
				'sticky left-4 z-[2]': !!this.definition?.sticky,
				'bg-gradient-to-r from-white to-transparent dark:from-hurricane-700 from-80%':
					this.definition?.sticky && this.definition?.sticky !== 'secondary',
				'bg-gradient-to-r from-off-white-300 to-transparent dark:from-hurricane-400 from-80%':
					this.definition?.sticky && this.definition?.sticky === 'secondary',
				'flex-shrink': !this.scrollable,
				'flex-shrink-0': this.scrollable,
			}
		);
	}

	get data() {
		if (this.variant === 'header' || this.variant === 'header-secondary') {
			return {
				value: this.value,
			};
		}

		return {
			value:
				(this.value ?? this.definition?.path)
					? objectGetByPath(this.item, this.definition.path)
					: null,
			item: this.item,
			index: this.index,
			rowIndex: this.rowIndex,
		};
	}

	get headerClass() {
		const align = this.definition?.headerAlign ?? this.definition?.align;

		return cn('overflow-hidden text-ellipsis', {
			'text-start': align === undefined || align === 'start',
			'text-center': align === 'center',
			'text-end': align === 'end',
		});
	}
}
