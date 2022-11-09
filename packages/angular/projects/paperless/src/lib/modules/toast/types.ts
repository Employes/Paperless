import { RotateOptions } from '@paperless/core';
import {
    IconFlipOptions,
    IconVariant,
} from '@paperless/core/dist/types/components/atoms/icon/icon.component';
import { ToastDirective } from './directives';

export enum ToastVariants {
    Success = 'positive',
    Warning = 'unbiased',
    Error = 'negative',
    Positive = 'positive',
    Unbiased = 'unbiased',
    Negative = 'negative',
}

export type ToastActionFunction = (directive?: ToastDirective) => void;

export interface ToastOptions {
    delay?: number | 'infinite';
    dismissOnAction?: boolean;

    enableAction?: boolean;
    action?: ToastActionFunction;

    icon?: {
        variant?: IconVariant;
        flip?: IconFlipOptions;
        rotate?: RotateOptions;
    };
}

export interface ToastData {
    variant: ToastVariants;
    header: string;
    content: string;
    options: ToastOptions;
}
