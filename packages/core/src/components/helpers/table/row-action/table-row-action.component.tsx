import { Component, Prop } from '@stencil/core';
import {
	IconFlipOptions,
	IconVariant,
	RotateOptions,
} from '../../../../components';

export type TableRowActionFunc = {
	(item: any, multi: false): void;
	(item: any[], multi: true): void;
};

export type TableRowActionShowFunc = {
	(item: any): boolean;
};

@Component({
	tag: 'p-table-row-action',
})
export class TableRowAction {
	/**
	 * The type of action
	 * mutli = Only multi select action
	 * single = Only an action on the row
	 * both = Action on both locations
	 */
	@Prop({ reflect: true, mutable: true }) type: 'both' | 'single' | 'multi' =
		'both';

	/**
	 * Icon to show on the button
	 */
	@Prop() icon: IconVariant;

	/**
	 * Wether the button is icon only
	 */
	@Prop() iconOnly: boolean = false;

	/**
	 * Icon flip
	 */
	@Prop() iconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate: RotateOptions;

	/**
	 * Label of the action
	 */
	@Prop() label: string;

	/**
	 * The action to trigger when used
	 */
	@Prop() action: TableRowActionFunc;

	/**
	 * Wether the action is disabled
	 */
	@Prop() disabled: boolean = false;

	/**
	 * Wether the action is loading
	 */
	@Prop() loading: boolean = false;

	/**
	 * A function for row actions of type "single" or "both" that determines if the action is shown on the row
	 */
	@Prop() showFunction: TableRowActionShowFunc;

	render() {
		return;
	}
}
