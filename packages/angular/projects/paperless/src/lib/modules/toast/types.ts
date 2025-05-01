import { RotateOptions } from '@paperless/core';
import {
	IconFlipOptions,
	IconVariant,
} from '@paperless/core/dist/types/components/atoms/icon/icon.component';
import { ToastDirective } from './directives';

export enum ToastVariants {
	Success = 'positive',
	Warning = 'biased',
	Error = 'negative',
	Neutral = 'neutral',
	Positive = 'positive',
	Biased = 'biased',
	Negative = 'negative',
}

export type ToastActionFunction = (
	directive?: ToastDirective,
	data?: any
) => void;

export interface ToastOptions {
	delay?: number | 'infinite';
	dismissOnAction?: boolean;

	enableAction?: boolean;
	action?: ToastActionFunction;
	actionData?: any;

	icon?: {
		variant?: IconVariant;
		flip?: IconFlipOptions;
		rotate?: RotateOptions;
	};
}

export interface ToastData {
	identifier: string;
	variant: ToastVariants;
	header: string;
	content: string;
	options: ToastOptions;
}
