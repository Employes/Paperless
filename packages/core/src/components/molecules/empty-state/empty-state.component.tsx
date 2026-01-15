import {
	Component,
	h,
	Prop,
	Event,
	EventEmitter,
	Element,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ButtonVariant } from '../../../components';
import { ThemedHost } from '../../../internal/themed-host.component';
import { IconVariant } from '../../../types/icon';
import { IllustrationVariant } from '../../../types/illustration';
import { asBoolean } from '../../../utils/as-boolean';

const emptyState = cva(
	['flex flex-col w-full items-center justify-start max-w-[20rem]'],
	{
		variants: {
			enableAction: {
				true: 'cursor-pointer',
				false: null,
			},
		},
	}
);

@Component({
	tag: 'p-empty-state',
	styleUrl: 'empty-state.component.css',
	shadow: true,
})
export class EmptyState {
	/**
	 * The variant of the illustration
	 */
	@Prop() illustration: IllustrationVariant;

	/**
	 * The header of the empty state
	 */
	@Prop() header: string;

	/**
	 * The content of the empty state
	 */
	@Prop() content: string;

	/**
	 * Wether to enable the action button
	 */
	@Prop() enableAction: boolean = true;

	/**
	 * The text on the action button
	 */
	@Prop() actionText: string;

	/**
	 * The variant of the action
	 */
	@Prop() actionVariant: ButtonVariant = 'secondary';

	/**
	 * The icon for the action button
	 */
	@Prop() actionIcon: IconVariant;

	/**
	 * The position of the action icon
	 */
	@Prop() actionIconPosition: 'start' | 'end' = 'start';

	/**
	 * Wether the action is loading
	 */
	@Prop() actionLoading: boolean = false;

	/**
	 * The text on the action button
	 */
	@Event({
		bubbles: false,
	})
	action: EventEmitter<MouseEvent>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		const hasHeaderSlot = !!this._el.querySelector(':scope > [slot="header"]');
		const hasContentSlot = !!this._el.querySelector(
			':scope > [slot="content"]'
		);
		const hasActionSlot = !!this._el.querySelector(':scope > [slot="action"]');

		return (
			<ThemedHost>
				<div
					class={emptyState({
						enableAction: asBoolean(this.enableAction, true),
					})}
					onClick={ev =>
						this.enableAction && !this.actionLoading
							? this.action.emit(ev)
							: undefined
					}
				>
					{this.illustration && (
						<p-illustration
							class='mb-8 text-5xl text-indigo-600'
							variant={this.illustration}
						/>
					)}
					{hasHeaderSlot ? (
						<slot name='header' />
					) : (
						this.header?.length && (
							<p class='my-0 text-center font-ambit text-sm font-bold text-storm-500 dark:text-white'>
								{this.header}
							</p>
						)
					)}
					{hasContentSlot ? (
						<slot name='content' />
					) : (
						this.content?.length && (
							<p class='my-0 text-center text-sm font-normal text-storm-300 dark:text-hurricane-200'>
								{this.content}
							</p>
						)
					)}
					{this.enableAction &&
						(hasActionSlot ? (
							<slot name='action' />
						) : (
							<p-button
								class='mt-4'
								icon={this.actionIcon}
								iconPosition={this.actionIconPosition}
								loading={this.actionLoading}
								variant={this.actionVariant}
							>
								{this.actionText}
							</p-button>
						))}
				</div>
			</ThemedHost>
		);
	}
}
