import { Routes } from '@angular/router';

import { CropperComponent } from './features/cropper/cropper.component';
import { DatepickerComponent } from './features/datepicker/datepicker.component';
import { DrawerComponent } from './features/drawer/drawer.component';
import { HomeComponent } from './features/home/home.component';
import { InputsComponent } from './features/inputs/inputs.component';
import { ModalComponent } from './features/modal/modal.component';
import { SelectComponent } from './features/select/select.component';
import { StepperComponent } from './features/stepper/stepper.component';
import { TableComponent } from './features/table/default/table.component';
import { ScrollableTableComponent } from './features/table/scrollable/table.component';
import { ToastComponent } from './features/toast/toast.component';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/home/home.component').then(c => c.HomeComponent),
	},
	{
		path: 'modal',
		loadComponent: () =>
			import('./features/modal/modal.component').then(c => c.ModalComponent),
	},
	{
		path: 'drawer',
		loadComponent: () =>
			import('./features/drawer/drawer.component').then(c => c.DrawerComponent),
	},
	{
		path: 'toast',
		loadComponent: () =>
			import('./features/toast/toast.component').then(c => c.ToastComponent),
	},
	{
		path: 'table',
		loadComponent: () =>
			import('./features/table/default/table.component').then(
				c => c.TableComponent
			),
	},
	{
		path: 'scrollable-table',
		loadComponent: () =>
			import('./features/table/scrollable/table.component').then(
				c => c.ScrollableTableComponent
			),
	},
	{
		path: 'datepicker',
		loadComponent: () =>
			import('./features/datepicker/datepicker.component').then(
				c => c.DatepickerComponent
			),
	},
	{
		path: 'cropper',
		loadComponent: () =>
			import('./features/cropper/cropper.component').then(
				c => c.CropperComponent
			),
	},
	{
		path: 'select',
		loadComponent: () =>
			import('./features/select/select.component').then(c => c.SelectComponent),
	},
	{
		path: 'inputs',
		loadComponent: () =>
			import('./features/inputs/inputs.component').then(c => c.InputsComponent),
	},
	{
		path: 'stepper',
		loadComponent: () =>
			import('./features/stepper/stepper.component').then(
				c => c.StepperComponent
			),
	},
];
