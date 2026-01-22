/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
import { IconFlipOptions, IconVariant, RotateOptions } from '@paperless/core';

import { PToastDirective } from './directives';

export enum PToastVariants {
	Success = 'positive',
	Warning = 'biased',
	Error = 'negative',
	Neutral = 'neutral',
	Positive = 'positive',
	Biased = 'biased',
	Negative = 'negative',
}

export type PToastActionFunction = (
	directive?: PToastDirective,
	data?: any
) => void;

export interface PToastOptions {
	delay?: number | 'infinite';
	dismissOnAction?: boolean;

	enableAction?: boolean;
	action?: PToastActionFunction;
	actionData?: any;

	icon?: {
		variant?: IconVariant;
		flip?: IconFlipOptions;
		rotate?: RotateOptions;
	};
}

export interface PToastData {
	identifier: string;
	variant: PToastVariants;
	header: string;
	content: string;
	options: PToastOptions;
}
