import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	Listen,
	Prop,
	State,
} from '@stencil/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { IconVariant } from '../../../components';
import { QuickFilter } from '../../../types/table';
import {
	formatTranslation,
	getLocaleComponentStrings,
} from '../../../utils/localization';

export type templateFunc = () => string;
export type buttonTemplateFunc = (amount: number) => string;

@Component({
	tag: 'p-table-header',
	styleUrl: 'table-header.component.scss',
	shadow: true,
})
export class TableHeader {
	private _defaultFilterButtonTemplate: templateFunc = () =>
		formatTranslation(this._locales.filter);
	private _defaultActionButtonTemplate: buttonTemplateFunc = (amount: number) =>
		this.actionText
			? this.actionText
			: formatTranslation(
					amount === 0
						? this._locales.edit
						: amount === 1
						? this._locales.edit_single
						: this._locales.edit_plural,
					{ amount }
			  );

	/**
	 * Quick filters to show
	 */
	@Prop() quickFilters: QuickFilter[] = [];

	/**
	 * Active quick filter identifier
	 */
	@Prop() activeQuickFilterIdentifier: string;

	/**
	 * Wether we want to show loading state
	 */
	@Prop() loading: boolean = false;

	/**
	 * Wether to show the search input
	 */
	@Prop() enableSearch: boolean = true;

	/**
	 * The amount of items that are selected
	 */
	@Prop() itemsSelectedAmount: number = 0;

	/**
	 * The query to show in the search bar
	 */
	@Prop({ mutable: true }) query: string;

	/**
	 * Wether to show the filter button
	 */
	@Prop() enableFilter: boolean = true;

	/**
	 * Wether to show the filter button on desktop
	 */
	@Prop() enableFilterDesktop: boolean = true;

	/**
	 * The amount of filters being selected
	 */
	@Prop() selectedFiltersAmount: number;

	/**
	 * The template for the filter button text
	 */
	@Prop() filterButtonTemplate: templateFunc =
		this._defaultFilterButtonTemplate;

	/**
	 * Wether to show the action button
	 */
	@Prop() enableAction: boolean = true;

	/**
	 * Wether the action button is loading
	 */
	@Prop() actionLoading: boolean = false;

	/**
	 * The action button icon
	 */
	@Prop() actionIcon: IconVariant = 'pencil';

	/**
	 * The action button text if changed
	 */
	@Prop() actionText: string;

	/**
	 * Wether to enable the action button
	 */
	@Prop({ mutable: true }) canUseAction: boolean = false;

	/**
	 * The template for the action button text
	 */
	@Prop() actionButtonTemplate: buttonTemplateFunc =
		this._defaultActionButtonTemplate;

	/**
	 * Event when one of the quick filters is clicked
	 */
	@Event({
		bubbles: false,
	})
	quickFilter: EventEmitter<QuickFilter>;

	/**
	 * Event when the query changes
	 */
	@Event({
		bubbles: false,
	})
	queryChange: EventEmitter<string>;

	/**
	 * Event when the filter button is clicked
	 */
	@Event({
		bubbles: false,
	})
	filter: EventEmitter<null>;

	/**
	 * Event when the action button is clicked
	 */
	@Event({
		bubbles: false,
	})
	action: EventEmitter<null>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	/**
	 * Locales used for this component
	 */
	@State() private _locales: any = {};

	private _queryObserver = new Subject<string>();

	componentWillLoad() {
		this._setLocales();
	}

	componentDidLoad() {
		this._queryObserver
			.pipe(debounceTime(300), distinctUntilChanged())
			.subscribe(value => this.queryChange.emit(value));
	}

	render() {
		const activeQuickFilter = this.quickFilters.find(
			f => f.identifier === this.activeQuickFilterIdentifier
		);
		const mobileTotal =
			(this.selectedFiltersAmount || 0) + (activeQuickFilter?.default ? 0 : 1);

		const hasCustomFilterSlot = !!this._el.querySelector(
			':scope > [slot="custom-filter"]'
		);

		const hasCustomActionsSlot = !!this._el.querySelector(
			':scope > [slot="custom-actions"]'
		);

		return (
			<Host class='p-table-header'>
				{this.loading && (
					<p-loader
						variant='ghost'
						class='hidden h-8 w-3/4 rounded desktop-xs:flex'
					></p-loader>
				)}

				{!this.loading &&
					(hasCustomFilterSlot || this.quickFilters.length > 0) && (
						<div class='left-side flex flex-col justify-start gap-4 desktop-xs:flex-row'>
							{hasCustomFilterSlot && <slot name='custom-filter' />}

							{this.quickFilters.length > 0 && (
								<p-segment-container class='hidden desktop-xs:flex'>
									{this.quickFilters.map(item => (
										<p-segment-item
											active={
												item.identifier === this.activeQuickFilterIdentifier
											}
											onClick={() => this.quickFilter.emit(item)}
										>
											{typeof item.text === 'string' ? item.text : item.text()}{' '}
											{item?.count >= 0 ? `(${item.count})` : ''}
										</p-segment-item>
									))}
								</p-segment-container>
							)}
						</div>
					)}

				<div class='right-side flex flex-col justify-end gap-4 desktop-xs:flex-row'>
					{this.enableSearch && (
						<p-field
							icon='search'
							size='sm'
							class='desktop-xs:w-48'
						>
							<input
								type='text'
								slot='input'
								placeholder='Zoeken...'
								value={this.query}
								onInput={ev =>
									this._queryObserver.next(
										(ev.target as HTMLInputElement).value
									)
								}
							/>
						</p-field>
					)}

					{this.enableFilter && (
						<p-button
							icon='filter'
							variant='secondary'
							size='sm'
							class={`w-full ${
								this.enableFilterDesktop
									? 'desktop-xs:w-auto'
									: 'desktop-xs:hidden'
							}`}
							onClick={() => this.filter.emit()}
						>
							{this.filterButtonTemplate
								? this.filterButtonTemplate()
								: this._defaultFilterButtonTemplate()}
							{this.selectedFiltersAmount &&
								this._getLabel(this.selectedFiltersAmount)}
							{mobileTotal > 0 && this._getLabel(mobileTotal, 'mobile')}
						</p-button>
					)}

					{this.enableAction && this._buttonTemplate()}

					{hasCustomActionsSlot && <slot name='custom-actions' />}
				</div>

				{this.enableAction && this.canUseAction && (
					<div class='fixed bottom-0 left-0 block w-full border border-solid border-transparent border-t-mystic-dark bg-white p-4 desktop-xs:hidden'>
						{this._buttonTemplate(true)}
					</div>
				)}
			</Host>
		);
	}

	@Listen('localeChanged', { target: 'body' })
	private async _setLocales(): Promise<void> {
		this._locales = await getLocaleComponentStrings(this._el);
	}

	private _buttonTemplate(mobile = false) {
		return (
			<p-button
				class={mobile ? 'w-full' : 'hidden desktop-xs:flex'}
				icon={this.actionIcon}
				size='sm'
				disabled={!this.canUseAction}
				onClick={() => this.action.emit()}
				loading={this.actionLoading}
			>
				{this.actionButtonTemplate
					? this.actionButtonTemplate(mobile ? this.itemsSelectedAmount : 0)
					: this._defaultActionButtonTemplate(
							mobile ? this.itemsSelectedAmount : 0
					  )}
			</p-button>
		);
	}

	private _getLabel(amount, variant: 'mobile' | 'default' = 'default') {
		return (
			<p-badge
				class={`ml-1 ${
					variant === 'default'
						? 'hidden desktop-xs:flex'
						: 'flex desktop-xs:hidden'
				}`}
			>
				{amount}
			</p-badge>
		);
	}
}
