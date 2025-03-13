import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaperlessModule } from 'projects/paperless/src/public-api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CropperComponent } from './features/cropper/cropper.component';
import { DatepickerComponent } from './features/datepicker/datepicker.component';
import { DrawerComponent } from './features/drawer/drawer.component';
import { TestDrawerComponent } from './features/drawer/test-drawer.component';
import { HomeComponent } from './features/home/home.component';
import { TestCropperModalComponent } from './features/modal/cropper-modal.component';
import { ModalComponent } from './features/modal/modal.component';
import { TestModalComponent } from './features/modal/test-modal.component';
import { SelectComponent } from './features/select/select.component';
import { StepperComponent } from './features/stepper/stepper.component';
import { TableComponent } from './features/table/table.component';
import { ToastComponent } from './features/toast/toast.component';
import { InputsComponent } from './features/inputs/inputs.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [
		AppComponent,
		HomeComponent,
		TestModalComponent,
		TestCropperModalComponent,
		ModalComponent,
		TestDrawerComponent,
		DrawerComponent,
		ToastComponent,
		TableComponent,
		DatepickerComponent,
		CropperComponent,
		SelectComponent,
		StepperComponent,
		InputsComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		PaperlessModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
